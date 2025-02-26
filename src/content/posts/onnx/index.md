---
title: Exporting and quantizing Kokoro to ONNX
date: 2025-02-26
description: "A practical guide to exporting PyTorch models to ONNX format, with real-world examples from converting Kokoro TTS"
published: true
---

I develop and maintain a [text-to-speech plugin for obsidian](https://github.com/adrianlyjak/obsidian-aloud-tts) as a side project. It's been a goal of mine to embed a TTS model in the plugin instead of depending on OpenAI's TTS API. I knew this would involve ONNX, since that's somewhat the defacto way to export models to run in the browser and other environments, especially for pytorch models. I'd considered trying to convert styleTTS2 to ONNX, but StyleTTS2 is a fairly complex model, and I'd never worked with ONNX before. Later, I discovered a site called hexgrad.com that included an ONNX exported styleTTS2 model, so I knew it was doable.

Then, later, Kokoro TTS was released with open-weights by hexgrad. Even better, they collaborated with Hugging Face (Xenova) to create a browser-friendly ONNX model and kokoro.js runtime. However, I had two concerns: First, there were no export scripts available (and I wanted to learn about ONNX). Second, when testing kokoro.js, inference was quite slow - taking around 20 seconds to process a short sentence with the quantized model.

I began by creating scripts to export Kokoro to ONNX format, which would help me understand the ONNX ecosystem better.

## Understanding ONNX Export Methods for PyTorch

Since pytorch is "eager," in order to export a model from pytorch, you need to actually run the model with some sample or dummy data. The first thing that I ran into is that there are many ways to do this, that are in flux.

The underlying infrastructure for exporting from pytorch is changing. The old style of exporting is frozen (no new features). I think largely it depends on JIT tracing ([`torch.jit.trace`](https://pytorch.org/docs/stable/generated/torch.jit.trace.html)) in order to capture the model graph. This has trouble capturing python control flow, like if statements and for loops. There's also an alternate mechanism to export with `torch.onnx.export` that uses the `torch.jit.script` function to workaround this, which is also frozen

The `torch.jit.script` and `torch.jit.trace` systems are being replaced with a new system called [Dynamo](https://pytorch.org/docs/stable/torch.compiler_dynamo_overview.html). This is actually able to inspect the python byte code, and export it (understanding things like conditionals, loops, etc.). At time of writing, the dynamo system is still under active development, and not feature complete.

Without digging further into these systems, the first thing that you'll need to do to export your model is to find which of these 3 systems will work best for exporting your model.

1. Using dynamo will be more future proof, but is still under development, so things may not yet be implemented, and there may be breaking changes.
2. Using `torch.jit.trace` or `torch.jit.script` may not have newer features, or might have unfixed bugs, due to lack of maintenance.

The basics of exporting a model look like this:

```python
# make sure you have torch and onnx installed
import torch

# your model
model = torch.nn.Linear(10, 10)

# dummy input
dummy_input = torch.randn(10)

# export the model
torch.onnx.export(
    model,
    dummy_input,
    "my_model.onnx",
    input_names=["input"],
    output_names=["output"],
)
```

To export with torch script, your module would need to be decorated with `@torch.jit.script`.

Or, to export with dynamo, make sure you have `onnxscript` installed, and then just add `dynamo=True` to the `export` function.

```python
import torch

model = torch.nn.Linear(10, 10)
dummy_input = torch.randn(10)

# export the model
torch.onnx.export(
    model,
    dummy_input,
    "my_model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamo=True, # added this
)
```

## Technical Challenges with Kokoro

There were some uses of numpy and other conditionals that were within the kokoro model, and unnecessarily moving tensors between CPU and GPU. These were easily removable with some code changes. There were however some more hairy issues that I ran into:

**Dynamo Compatibility:** When using dynamo, [LSTM layers are not yet supported](https://github.com/pytorch/pytorch/issues/91439). This unfortunately kind of ruled out using dynamo for kokoro.

**STFT Layer Issues:** When switching back to the old method, there is a STFT (Short Time Fourier Transform) layer that is used in the model. The torch module for this uses complex numbers, which are not supported in the old style ONNX export. I fixed this with [a complete rewrite of a custom STFT layer which does not use complex numbers](https://github.com/hexgrad/kokoro/pull/87/files#diff-8c785e3b6313f48d7dd407d955709702cde021028dc7d928f7ead621609483b9). The frustrating thing here is that there is a catch-22, in that the new dynamo system could have exported the STFT layer, but it has the issue with the LSTM layer, which I could not find a workaround for.

**InstanceNorm1d Export Bug:** The next issue, which took me a while to figure out, is that there's [just a bug in the `InstanceNorm1d` export](https://github.com/pytorch/pytorch/issues/92977), that requires `affine=True`, otherwise shape inference fails. ([Kokoro fix here](https://github.com/hexgrad/kokoro/pull/104/files)). This is presumably just an issue with the old export method, and not with dynamo.

**Numerical Discrepancies:** Another issue I ran into was that, once I finally got an export working, there was a numerical discrepancy between the pytorch model and the ONNX model. I debugged this by outputting the intermediate values of the model to onnx, and comparing where they went wrong. It turns out there was an issue in the custom STFT layer, that was causing the discrepancy.

While this all sounds pretty simple. The errors that are output are often vague, so you need to guess and check things throughout the entire module. You also don't know the whole scope of what needs to be fixed until it finally works. Once you change something, you just get the next error, and have to figure out if its a regression from your last fix, or if its just the next thing that needs to be fixed.

## Model Optimization Techniques

Once I got an export working, I wanted to make the model smaller and faster. There's a few ways to do this. Depending on the system or runtime, some of these may make the model slower, but they all usually make the model smaller.

**Float16 casting:** This converts some or all of the float32 weights in the model to float16. This is a simple and effective way to make the model smaller and faster. The conversion is straightforward, but it may cause numerical instability in some layers. This effectively halves the size, and on some systems, makes the model faster. An alternative to this is to use `bfloat16`, which is generally more numerically stable, but may not be supported everywhere.

**Quantizing weights only (dynamic quantization):** Weights are the static learned parameters of the model that get loaded. This converts the float32 weights to int of various bit-depths (usually 8-bit for ONNX). When quantizing, the distribution of the values needs to be analyzed in order to determine the quantization parameters. Layers that are quantized are replaced with a quantized version of the layer that includes the quantization parameters. For example, a `Linear` layer will be replaced with a `QuantizedLinear` layer. Quantizing weights significantly reduces the size of the model. On some systems, this also makes the model faster, others, it just adds overhead, such as the WASM backend for `onnxruntime`.

**Quantizing weights and activations (static quantization):** This converts the float32 weights _and_ activations to int8 or uint8. The activations are the values that are passed through the layers during inference, so quantizing them does not reduce the size of the model, but it can make the model faster if the system and runtime support optimizations for the quantized types. In order to determine the quantization parameters for the activations, the distribution of the values needs to be analyzed. This is done by running the model with a representative dataset, and analyzing the distribution of the values. Dynamic quantization knows the distribution of the weights, and calculates the distribution of the activations per-tensor on the fly (which adds some overhead). In general, static quantization is the fastest option for systems that support optimized quantized operations, but is the most unstable option.

**QDQ vs QOperator:** There's an additional option to use QDQ (Quantization-Dequantization) or QOperator (Quantization-Operator) nodes when doing static quantization. QDQ uses normal layers, but inserts quantization and dequantization nodes around the layer. This is more flexible, but does not offer the same performance benefits that QOperator does.

### Converting Kokoro to Float16

The first issue I ran into with kokoro was that the [onnx utility script](https://onnxruntime.ai/docs/performance/model-optimizations/float16.html) for casting to float16 was not working. The script inserts casts to and from float32 around layers, and converts the layers to float16. For Kokoro, it created an invalid model:

1. it doesn't correctly traverse sub-graphs. For example, you can have an `If` or `Loop` node in onnx, which in turn has a subgraph. These nodes have their own explicity inputs and outputs in the graph, but their sub-graphs also can depend on tensors from the parent graph. What happens with the utility script is that your inner graph might have a node that is expecting float32 input that now depends on a float16 tensor. At inference time, you will get an error when creating the session.
2. You can specify certain nodes to not be converted to float16. However, blocked ops will still have have casts inserted around them to/from float16/float32. Currently, if two blocked ops are next to each other, the casts will still be inserted, creating a redundant pair. Theoretically, ORT will optimize this pair out at runtime, so the results will remain at full-precision. However, I was running into numerical instability issues with this.

I somewhat explored using Intel's Neural Compressor, which seems to say it supports mixed precision quantization and float16 conversion, but I wasn't able to get it working. Neural compressor does some sort of experiments to find the best datatype parameters. Kokoro has a lot of layers, so its kind of too much work for neural compressor to explore. Even when I specified all of the datatypes, it still attempted to run experiments, and always took a really long time to get terrible results.

So, I ended up writing a [custom script to cast to float16](https://github.com/adrianlyjak/kokoro-onnx-export/blob/main/src/kokoro_onnx/convert_float_to_float16.py) to work around these issues. It works here for Kokoro, but it's also general purpose, so could be used for other models as well.

### Quantizing Kokoro

When blindly quantizing or casting to fp16, all layers of Kokoro, the output quality becomes terrible. Some of the layers are too sensitive. I got weird static sounds, and other distortions. So to effectively quantize or cast to fp16, I needed to find the layers that were causing the issues, and exclude them. This is theoretically what intel neural compressor does, but, again, it didn't work for me.

So I took a simpler approach. I developed a sort-of loss function that would evaluate the similarity between the float32 model output and the compressed model with a sample input. The current loss function uses a mel-spectrogram difference. This works slightly better than a simple MSE loss, but it still has some trouble detecting static. Then, using this loss function, I iterated over all the nodes in the ONNX model, and quantized or cast only that layer and recorded the loss. Then, based on these scores, I could exclude layers with certain thresholds of loss. Some of the layers that were causing issues still had low loss scores, but they were easier to find once I had a sorted list of layers that I could [binary search debug through](https://www.codewithjason.com/binary-search-debugging/).

The resulting scripts for exporting and quantizing kokoro are available at [adrianlyjak/kokoro-onnx-export](https://github.com/adrianlyjak/kokoro-onnx-export).

### Performance and final thoughts

As I mentioned earlier, the quantized model is still slow to run in the browser. After going through this process, I have a much clearer idea of where the performance issues are coming from.

1. WebGPU is now supported in kokoro.js. The specific blocker here originally was that there was a bug in the onnxruntime webgpu implementation that has since been fixed. On my fancy macbook pro M3, using webgpu takes inference time down to 4s for the fp32 model. Unfortunately, it seems like there's numerical discrepancy issues for the float16 and quantized models on webgpu still.
2. It's difficult for the WASM backend for onnxruntime web to take advantage of CPU optimizations. I [did some testing](https://github.com/microsoft/onnxruntime/issues/11181#issuecomment-2676980780), again on mac M3, and found that the FP32 models runs around 4-5x slower in WASM than the CPU backend, and the dynamically quantized models runs around 3x slower. In both cases, the quantized models are slower than the fp32 model. I'm not sure if there's much that can be done about this. I tried adding SIMD options to the onnx session, but they didn't seem to make a difference.

| Model | Inference Time | Backend |
| ----- | -------------- | ------- |
| FP32  | 7s             | WASM    |
| FP32  | 1.5s           | CPU     |
| Int8  | 12s            | WASM    |
| Int8  | 4s             | CPU     |

## Key Takeaways

If I move forward with adding kokoro to the obsidian plugin, it seems like the best approach for widest support will be to use the fp32 model, and use the webgpu backend if it's available.

- ONNX export methods are in transition, with Dynamo being the future but not yet fully featured
- Complex models may require careful handling of specific layers (LSTM, STFT) during export
- Model optimization through quantization and float16 conversion requires careful testing of each layer
- WebGPU shows promise for browser-based inference, but still has compatibility challenges

If you're planning to export your own PyTorch models to ONNX, start with the simplest export method and gradually work through compatibility issues. Test thoroughly at each optimization step, and don't assume that smaller model size will always translate to better performance.
