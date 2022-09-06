import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  error!: string;

  constructor(private s: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public submit() {
    this.s.login(this.username, this.password).subscribe(
      result => this.router.navigate(['home']),
      err => this.error = 'Could not authenticate'
      
    );
  }

}
