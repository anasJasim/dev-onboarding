import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "ws";

export const EVENT_GATEWAY = "EVENT_GATEWAY";

@WebSocketGateway(Number(process.env.NODE_WS_PORT))
export class EventsGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage("event")
  handleMessage(@MessageBody() body: any) {
    console.log(body);
  }

  sendToAllClients(event: string, data: any) {
    this.server.clients.forEach((client) => {
      client.send(JSON.stringify({ event, data }));
    });
  }
}
