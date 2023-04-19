import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  action: string = "Login";
  username!: string;
  password!: string;
  error!: string;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.action == "Login") {
      this.auth.login(this.username, this.password).subscribe(
        result => this.router.navigate(['home']),
        err => {
          console.log(err);
          this.error = 'Could not authenticate'
        }
      );
    } else {
      this.auth.register(this.username, this.password).subscribe(
        result => this.router.navigate(['home']),
        err => {
          console.log(err);
          this.error = 'Could not authenticate'
        }
      );
    }
  }

  toggle() {
    if (this.action == "Login") {
      this.action = "Register";
    } else {
      this.action = "Login";
    }
  }
}
