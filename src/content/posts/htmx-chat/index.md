---
title: Streaming HTMX chat
date: 2024-07-16
description: How to stream interfaces efficiently using htmx
published: true
---

# Building a Streaming Chat Interface with HTMX

There are many simple examples of building rudimentary streaming interfaces with HTMX. These examples usually just update a single element and completely overwrite the element's content periodically. I wanted to create a UI that was a little more full featured, and more efficient with the amount of data streamed. 

This is a tutorial for building a barebones chat interface that demonstrates how to do this. Full code on [github](https://github.com/adrianlyjak/htmx-python-chat)

If you don't know what HTMX is, it's a minimal javascript library that enables making interactive UIs that are more server side focused controlled mostly with additional xml attributes. This is great for prototyping or making simple applications.

## Setting Up the HTML

First, let's look at the HTML structure required for our chat interface:

```html
<html>
    <head>
        <title>Example HTMX chat</title>
        <script src="https://unpkg.com/htmx.org@1.9.0"></script>
        <script src="https://unpkg.com/htmx-ext-ws@2.0.0/ws.js"></script>
    </head>
    <body>
        <main hx-ext="ws" ws-connect="/ws/chat">
            <div id="game-content"><i>Nothing to see here</i></div>
            <form ws-send="game-input">
                <input name="game-input" id="game-input" placeholder="Type a message" />
                <button type="submit">Send</button>
            </form>
        </main>
    </body>
</html>
```

Let's break down the key HTMX attributes and what they do:

1. `hx-ext="ws"`: This attribute extends HTMX with WebSocket capabilities.

2. `ws-connect="/ws/chat"`: This attribute tells HTMX to establish a WebSocket connection to the specified endpoint ("/ws/chat") when the element loads.

3. `ws-send=""`: Applied to the form element, this attribute instructs HTMX to send the form data over the WebSocket connection when the form is submitted.

## WebSocket Response Handling

Now, let's dive into how we handle WebSocket responses to create a dynamic chat interface:

### Updating the Input Field

After sending a message, we clear the input field:

```html
<input value="" name="game-input" id="game-input"/>
```

This HTML snippet is sent via WebSocket to reset the input field after submission.

### Adding User Messages

When a user sends a message, we append it to the chat:

```html
<div id="game-content" hx-swap-oob="beforeend">
  <div class="msg-human">Human: [user message]</div>
</div>
```

The `hx-swap-oob="beforeend"` attribute is crucial here. It tells HTMX to append this content to the end of the element with id "game-content", rather than replacing its entire contents.

### Streaming Bot Responses

For bot responses, we use a two-step process to create a smooth typing effect:

1. First, we create a placeholder for the bot's message:

   ```html
   <div id="game-content" hx-swap-oob="beforeend">
     <div id="resp-[unique_id]"></div>
   </div>
   ```

2. Then, we stream individual words into this placeholder:

   ```html
   <div id="resp-[unique_id]" hx-swap-oob="beforeend">word </div>
   ```

Again, the `hx-swap-oob="beforeend"` attribute is key. It allows us to append each word to the existing message, creating a typing effect. Especially for long chat's, it's much more efficient to send single words. For example, if you're chat is 5000 words, and the LLM is responding with 5 tokens per second, that starts to be 25,000 words/s of overhead where just a few would do.

## The Python Backend

While we won't dig into the Python code, it's worth noting a few key aspects:

1. We use Starlette, a lightweight ASGI framework, to handle both HTTP and WebSocket connections.

2. The `websocket_endpoint` function manages the WebSocket connection, processing incoming messages and sending responses.

3. We simulate a delay between words in the bot's response using `asyncio.sleep(0.1)`, creating a more realistic typing effect.

4. The backend randomly selects responses from a predefined list, demonstrating how you might integrate a more complex chatbot or AI system.

## Conclusion

This example demonstrates how to create a dynamic, efficient chat interface using HTMX and WebSockets. By leveraging HTMX's out-of-band swaps and unique identifiers, we can create a smooth, responsive experience with minimal JavaScript.

The key takeaways are:

1. Use `hx-swap-oob="beforeend"` to append new content without overwriting existing messages.
2. Employ unique identifiers for message elements to allow targeted updates.
3. Stream bot responses word-by-word for a more engaging interface.

This approach provides a solid foundation for building more complex chat applications, integrating with AI services, or creating interactive tutorials and guides.