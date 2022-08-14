import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit {
  isLoggedIn!: boolean;
  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.authService
      .isLoggedInUpdate()
      .subscribe((response) => (this.isLoggedIn = response));
  }

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.router.navigateByUrl("/login");
  }

  logout(): void {
    this.authService.logout();
  }
}
