export const connectionHandler = (socket: any, ws: any,msg: any) => {
    ws.id = msg.id;
    broadcastConnection(socket, ws, msg)
  }

export const broadcastConnection = (socket: any, ws: any, msg: any) => {
    socket.clients.forEach(el => {
        if(el.id === msg.id){
            el.send(JSON.stringify(msg))
        }
    })
  }