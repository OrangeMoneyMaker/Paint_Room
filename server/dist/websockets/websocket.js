import { WebSocketServer } from 'ws';
import { broadcastConnection, connectionHandler } from './services.js';
export default async (expressServer) => {
    const websocketServer = new WebSocketServer({ server: expressServer });
    websocketServer.on('connection', (ws, req) => {
        ws.on('message', (msg) => {
            msg = JSON.parse(msg);
            switch (msg.method) {
                case 'connection':
                    connectionHandler(websocketServer, ws, msg);
                    break;
                case "draw":
                    broadcastConnection(websocketServer, ws, msg);
                    break;
            }
        });
    });
    return websocketServer;
};
//# sourceMappingURL=websocket.js.map