import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UrlsService {
  private port: number = 3000;
  private localUrl: string = `http://127.0.0.1:${this.port}/`;
  private remoteUrl: string = `https://pokedex-tuto-node.herokuapp.com/`;
  private baseUrl: string = this.localUrl;

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
