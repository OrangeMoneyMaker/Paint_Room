export const connectionHandler = (socket, ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(socket, ws, msg);
};
export const broadcastConnection = (socket, ws, msg) => {
    socket.clients.forEach(el => {
        if (el.id === msg.id) {
            el.send(JSON.stringify(msg));
        }
    });
};
//# sourceMappingURL=services.js.map