class XatkitClientMock {

    constructor(args) {

    }

    onConnect(callback) {
        callback()
    }

    onConnectionError(callback) {
        callback()
    }

    setConversationId(conversationId) {
    }

    getConversationId() {
    }

    onBotAction(type, callback) {
    }

    onBotMessage(type, callback) {
    }

    send(type, message) {
    }
}

export default XatkitClientMock
