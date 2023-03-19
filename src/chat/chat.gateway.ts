import { Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from "@nestjs/websockets";  
import { Server, Socket } from "socket.io";

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server : Server;

    async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
        console.log('connected');
        this.server.emit("connected");
    }

    async handleDisconnect(client: any) {
        
    }

    @SubscribeMessage("chat")
    async onChat(@ConnectedSocket() client: Socket, message){
        Logger.log("triggered");
        client.join("room")
    }
}