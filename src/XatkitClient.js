import io from "socket.io-client";


class XatkitClient {

    constructor(args) {
        this.username = args.username;
        this.hostname = args.hostname;
        this.serverUrl = args.serverUrl;
        this.url = args.url;
        this.origin = args.origin;
        this.conversationId = args.conversationId
        this.socket = io(args.serverUrl, {
            path: args.path
        });
    }

    onConnect(callback) {
        this.socket.on('connect', () => {
            this.socket.emit('init', { hostname: this.hostname, url: this.url, origin: this.origin, conversationId: this.conversationId })
        })

        this.socket.on('init_confirm', (session) => {
            this.setConversationId(session.conversationId)
            callback();
        })
    }

    onConnectionError(callback) {
        this.socket.on('connect_error', error => {
            console.log("Cannot connect to the Xatkit server");
            callback(error)
        })
    }

    setConversationId(conversationId) {
        this.conversationId = conversationId
    }

    getConversationId() {
        return this.conversationId
    }

    onBotAction(type, callback) {
        switch (type) {
            case "darkMode":
                this.socket.on('toggle_dark_mode', function() {
                callback();
            }); break;

            default:
                throw new Error('Unknown action ' + type + '.');
        }
    }

    onBotMessage(type, callback) {
        switch (type) {
            case "text":
                this.socket.on('bot_message', (message) => {
                    callback(message)
                }); break;

            case "miniCard":
                this.socket.on('link_snippet_with_img', (message) => {
                    callback(message);
                }); break;

            case "audio":
                this.socket.on("audio", (message) => {
                    callback(message);
                }); break;

            default:
                throw new Error('Unknown message type: ' + type + '.');
        }
    }

    send(type, message) {
        switch (type) {
            case "text": {
                const botMessage = {
                    message: message,
                    username: this.username
                }
                this.socket.emit('user_message', botMessage);
                break;
            }

            case "button": {
                const botMessage = {
                    selectedValue: message,
                    username: this.username
                }
                this.socket.emit('user_button_click', botMessage);
                break;
            }

            default:
                throw new Error('Unknown message type: ' + type + '.');

        }

    }
}

export default function initXatkitClient(args) {
    const { server, username, hostname, url, origin } = args;
    if (!server) {
        throw new Error('Server is undefined');
    }
    const urlPattern = /(^https?:\/\/[^/]+)\/?(.*)/i
    let parsedUrl = server.match(urlPattern)
    if (parsedUrl === null) {
        throw new Error('The provided URL ' + server + ' is not a valid URL')
    }
    let serverUrl = server
    let basePath = '/socket.io'
    if (parsedUrl.length !== null && parsedUrl.length === 3) {
        if (parsedUrl[2] !== '') {
            basePath = '/' + parsedUrl[2]
        }
        serverUrl = parsedUrl[1]
    }
    return new XatkitClient({ serverUrl, path: basePath, hostname, url, origin, username })
}

