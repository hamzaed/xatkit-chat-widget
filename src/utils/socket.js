import io from 'socket.io-client'


export default  (args, connectCallback, errorCallback) => {


        const socket = io(args.serverUrl, {
            path: args.basePath
        });
        socket.on('connect', () => {
            socket.emit('init', { hostname: args.hostname, url: args.url, origin: args.origin })
            connectCallback()

        });
        socket.on('connect_error', error => {
            console.log("Cannot connect to the Xatkit server");
            errorCallback(error)

        })
    return socket

}





