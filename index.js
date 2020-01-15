import XatkitWidget from './src/components/XatkitWidget';
import {
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons
} from './src/store/dispatcher';
import {
  renderXatkitWidget,
    renderDefaultXatkitWidget
} from "./src/utils/renderer";

export default  XatkitWidget;
export {
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  renderCustomComponent,
  toggleWidget,
  toggleInputDisabled,
  toggleMsgLoader,
  dropMessages,
  isWidgetOpened,
  setQuickButtons,
    renderDefaultXatkitWidget,
    renderXatkitWidget
};
