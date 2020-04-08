import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private _loginStatus: boolean = false;


  getUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/users');
  }

  login() {
    this.loginStatus = true;
  }

  logout() {
    this.loginStatus = false;
  }

  set loginStatus(status: boolean) {
    this._loginStatus = status;
  }

  public isAuthenticated(): boolean {
    return this._loginStatus;
  }

}
