import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus: boolean;
  currentUser={};
  users = [
    {
      id: 'user-1',
      name: 'Soham',
      password: 'admin',
      avatar: 'https://randomuser.me/api/portraits/thumb/men/26.jpg'
    },
    {
      id: 'user-2',
      name: 'Elsa',
      password: 'user',
      avatar: 'https://randomuser.me/api/portraits/thumb/women/65.jpg'
    }
  ];

  constructor() { }

  loginUser(loginDetails: any): Observable<any> {
    if(this.validateUser(loginDetails)){
      return of(this.currentUser);
    }else{
      return throwError("Invalid Credentials!");
    }
  }

  validateUser(loginDetails){
    for(let user of this.users){
      if(user.id === loginDetails.id){
        if(user.password === loginDetails.password){
          this.currentUser = user;
          return true;
        }
      }
    };
    return false;
  }

  login() {
    this.loginStatus = true;
  }

  logout() {
    this.loginStatus = false;
  }
  public isAuthenticated(): boolean {
    return this.loginStatus;
  }

  getCurrentUser(){
    return this.currentUser;
  }
}
