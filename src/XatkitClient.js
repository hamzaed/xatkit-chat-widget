import socketio from './utils/socket'



class XatkitClient {
    constructor(args) {
        this.socket = args.socket;
        this.username = args.username;
    }

    onBotMessage(callback){
        this.socket.on('bot_message', (message) => {
            callback(message)
        })
    }

    send(message){
        const botMessage = {
            message: message,
            username: this.username
        }
        this.socket.emit('user_message', botMessage)
    }
}

export default function initXatkitClient(args,connectCallback, errorCallback) {
    const {server, username, hostname, url, origin} = args;
    if(!server)
        throw new Error('Server is undefined')
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


    const socket = socketio({serverUrl, path: basePath, hostname, url, origin},connectCallback,errorCallback)
    console.log("perfect")
    return new XatkitClient({socket, username}, connectCallback, errorCallback)
}

