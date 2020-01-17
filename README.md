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
1. Using default values:

```javascript
import {renderDefaultXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderDefaultXatkitWidget();
```
Your HTML page should include
```html
<div id="xatkit-chat"></div>
```

2. Using custom parameters

```javascript
import {renderXatkitWidget} from 'xatkit-chat-widget'
import 'xatkit-chat-widget/lib/xatkit.css';

renderXatkitWidget('my-id','My title', 'My subtitle', true,'My placeholder');
```
Your HTML page should include
```html
<div id="my-id"></div>
```
