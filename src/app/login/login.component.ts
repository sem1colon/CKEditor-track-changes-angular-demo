import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginStatus: any;
  errorMessage: any;
  loginForm = new FormGroup({
    id: new FormControl('user-1', Validators.required),
    password: new FormControl('admin', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    event.preventDefault()
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.authService.login();
        this.router.navigate(['home']);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
