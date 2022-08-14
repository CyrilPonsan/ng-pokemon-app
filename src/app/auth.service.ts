import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, Subject, tap } from "rxjs";
import { UrlsService } from "./urls.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = false;
  isLoggedIn$: Subject<boolean> = new Subject<boolean>();
  token!: string;
  private redirectUrl!: string;
  private baseUrl: string = this.urlsService.getBaseUrl();

  constructor(private http: HttpClient, private urlsService: UrlsService) {}

  getToken(): string {
    return this.token;
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}api/login`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          this.token = response.data;
          if (this.token) {
            this.isLoggedIn = true;
            this.isLoggedIn$.next(true);
          } else {
            this.isLoggedIn = false;
            this.isLoggedIn$.next(false);
          }
        })
      );
  }

  logout() {
    this.isLoggedIn = false;
    this.isLoggedIn$.next(false);
    this.token = "";
  }

  isLoggedInUpdate(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
}
