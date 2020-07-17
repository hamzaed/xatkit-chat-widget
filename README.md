# xatkit-chat-widget

[![Build Status](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget.svg?branch=master)](https://travis-ci.org/xatkit-bot-platform/xatkit-chat-widget)
[![npm](https://img.shields.io/npm/v/xatkit-chat-widget.svg)](https://www.npmjs.com/package/xatkit-chat-widget)

A React component to embed Xatkit chatbots in websites.

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

renderXatkitWidget(args);
```


#### Using the bundle directly in your HTML page
- Download [xatkit.min.js](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.min.js) and [xatkit.min.css](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.min.css)
- Example:
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My title</title>
    <link href="./assets/xatkit.min.css" rel="stylesheet">
</head>
<body>
<div id="xatkit-chat"></div>
<!-- <div id="my-id"></div> -->

<script src="assets/xatkit.min.js"></script>
<script>
   xatkit.renderXatkitWidget();
  //xatkit.renderXatkitWidget(args);
</script>
</body>
</html>
```
- Extra resources: 

    - [xatkit.min.js.map](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.min.js.map): the source map of xatkit.min.js.
    - [xatkit.css](https://raw.githubusercontent.com/xatkit-bot-platform/xatkit-chat-widget/gh-pages/bundles/xatkit.css): the non-minified version of xatkit.min.css.



## API

### Methods 

* **renderXatkitWidget**:
  
    - Renders the Xatkit chat widget using custom parameters.
    - Parameters:
        - `args`: an object that holds the widget configuration. The structure of the object is the following:
        
```
{
   server,
   username,
   widget: {
      title,
      subtitle,
      startMinimized,
      placeHolders:{
         sender,
         buttons
      },
      images:{
         ProfileAvatar,
         launcherImage
      }
   },
   location:{
      hostname,
      url,
      origin
   },
   storage:{
      location,
      autoClear
   }
}
```
   
  

Notes: 
- Widget adapted from [react-chat-widget](https://github.com/Wolox/react-chat-widget).
- Support for session saving and loading adapted from [rasa-webchat](https://github.com/botfront/rasa-webchat).
