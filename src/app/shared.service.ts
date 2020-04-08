import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _users;

  private _currentUser;

  constructor() { }

  public get users() {
    return this._users;
  }

  public set users(users) {
    this._users = users;
  }

  public get currentUser() {
    return this._currentUser;
  }

  public set currentUser(user) {
    console.log(user.name, ' logged in..')
    this._currentUser = user;
  }

}
