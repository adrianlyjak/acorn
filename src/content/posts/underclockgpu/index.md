---
title: Underclocking GPU
date: 2024-07-15
description: My GPUs crash during extended use
published: false
---
My GPUs crash my whole computer when they run for too long at full capacity. I have a watercooled set-up with dual 3090s. They normally operate at 370W. I've been told that underclocking (undervolting?) them by 25% helps them stabilize, while only reducing overall performance around 5%.

I've somewhat arbitrarily interpretted that as 300W. After setting that they no longer crash. Unfortunately the setting isn't persistent. I think the command needs to be fired at startup in some way in order to be "persistent." These are the commands I use

Set GPU 0 power level to 300W
```sh
sudo nvidia-smi -i 0 -pl 300
```

And GPU 1 too

```sh
sudo nvidia-smi -i 1 -pl 300
```