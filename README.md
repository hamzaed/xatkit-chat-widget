# xatkit-chat-widget

[![Build Status](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget.svg?branch=master)](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget)
[![npm](https://img.shields.io/npm/v/xatkit-chat-widget.svg)](https://www.npmjs.com/package/xatkit-chat-widget)

A React component to embed Xatkit chatbots in websites.
Note: Adapted from [react-chat-widget](https://github.com/Wolox/react-chat-widget).

## Installation

### npm

```
npm install --save xatkit-chat-widget
```

### yarn

```
yarn add xatkit-chat-widget
```

## Usage

### Using default values:

```javascript
import {renderXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderXatkitWidget();
```
Your HTML page should include:
```html
<div id="xatkit-chat"></div>
```

![Default Xatkit Widget](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/img/default-widget.png)
### Using custom values

```javascript
import {renderXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderXatkitWidget(server, username, elementId, title, subtitle, startMinimized, senderPlaceHolder);
```


#### Using the bundle directly in your HTML page
- Download [xatkit.js](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.js) and [xatkit.css](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.css)
- Example:
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My title</title>
    <link href="./assets/xatkit.css" rel="stylesheet">
</head>
<body>
<div id="xatkit-chat"></div>
<!-- <div id="my-id"></div> -->

<script src="assets/xatkit.js"></script>
<script>
   xatkit.renderXatkitWidget();
  //xatkit.renderXatkitWidget(server, username, elementId, title, subtitle, startMinimized, senderPlaceHolder);
</script>
</body>
</html>
```



## API

### Methods 

* **renderXatkitWidget**:
  
    - Renders the Xatkit chat widget using custom parameters.
    - Parameters:
    
    | Parameter         | Type    | Description                                                  | Default Value                                                |
    | ----------------- | ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
    | `server`          | String  | The location of the Xatkit server to connect the component to (this URL must be the URL of the ReactPlatform *socket.io* endpoint) | `"http://localhost:5001"` (the default location of the ReactPlatform's *socket.io* server ) |
    | `username`        | String  | The name of the user currently conversing with the bot       | `"username"`                                                 |
    | `elementId`       | String  | The identifier of the DOM element to attach the component to. | `document.getElementById('xatkit-chat')` (this means that you need to have a `<div id="xatkit-chat"></div>` element in your DOM) |
    | `title`           | String  | The title of the bot's widget                                | `"Xatkit Chat"`                                              |
    | `subtitle`        | String  | The subtitle of the bot's widget                             | `"Test your Xatkit bot here!"`                               |
    | `startMinimized`    | Boolean | A flag telling whether the bot should start minimized        | `false`                                                      |
    | `senderPlaceHolder` | String  | The place holder text in the input field when no input is provided | `"Type a message"`                                           |
    
    

> **Note**: All the parameters are optional. If they are not specified, they will be set to their default value detailed above.
