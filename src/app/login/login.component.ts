import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users: any;

  errorMessage: any;

  loginForm = new FormGroup({
    id: new FormControl('user-1', Validators.required),
    password: new FormControl('admin', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.getUsers().subscribe(
      (response) => {
        this.sharedService.users = response;
        this.users = response;
        this.validateUser(this.loginForm.value);
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['home']);
        } else {
          this.errorMessage = 'Invalid Credentials!';
        }
      }
    );
  }

  validateUser(loginDetails) {
    for (let user of this.users) {
      if (user.id === loginDetails.id) {
        if (user.password === loginDetails.password) {
          this.sharedService.currentUser = user;
          this.authService.loginStatus = true;
        }
      }
    }
  }
}
