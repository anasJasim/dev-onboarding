import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  getHello(): string {
    return `Hello World!`;
  }
}
