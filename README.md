# xatkit-chat-widget

[![Build Status](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget.svg?branch=master)](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget)
[![npm](https://img.shields.io/npm/v/xatkit-chat-widget.svg)](https://www.npmjs.com/package/xatkit-chat-widget)

A React component to embed Xatkit chatbots in websites.
Note: Adapted from [react-chat-wdiget](https://github.com/Wolox/react-chat-widget).


## Installation

#### npm

```
npm install --save xatkit-chat-widget
```

#### yarn

```
yarn add xatkit-chat-widget
```

## Usage
#### Using default values:

```javascript
import {renderDefaultXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderDefaultXatkitWidget();
```
Your HTML page should include:
```html
<div id="xatkit-chat"></div>
```

![Default Xatkit Widget](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/img/default-widget.png)
#### Using custom values

```javascript
import {renderXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderXatkitWidget('my-id','My title', 'My subtitle', true,'My placeholder');
```
Your HTML page should include
```html
<div id="my-id"></div>
```
![Default Xatkit Widget](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/img/custom-widget.png)

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
   xatkit.renderDefaultXatkitWidget();
  //xatkit.renderXatkitWidget('my-id','My title', 'My subtitle', true,'My placeholder');
</script>
</body>
</html>
```
