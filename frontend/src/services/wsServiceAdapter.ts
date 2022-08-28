import {Observable, Subject} from 'rxjs';

export interface WsMessage {
  event: string;
  data: any;
}
export class WsServiceAdapter {
  private subject: Subject<WsMessage> = new Subject();
  constructor() {
    const wss = new WebSocket('ws://localhost:8020');
    wss.onopen = () => {
      console.log('WS connected');
    };
    wss.onmessage = (event) => {
      this.subject.next(JSON.parse(event.data));
    };
    wss.onclose = () => {
      console.log('WS disconnected');
    };
  }
  getMessage(): Observable<WsMessage> {
    return this.subject.asObservable();
  }
}
