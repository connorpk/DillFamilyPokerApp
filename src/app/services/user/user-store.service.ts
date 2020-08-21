import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user.response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(private router: Router) { }

  initUser: User={
    admin: null,
    active: false,
    email: '',
    firstname: '',
    lastname: '',
    username: ''
  };

  private readonly _user = new BehaviorSubject<User>(this.initUser);

  readonly $user: Observable<User> = this._user.asObservable();

  private get user(): User{
    return this._user.getValue();
  }

  private set user(user){
    this._user.next(user);
    this.router.navigate(['/user'])
  }

  login(user: User){
    this.user = user;
    console.log(this.user);
    this.router.navigate(['/user']);
  }

  logout(){
    this.user = this.initUser;
  }

}
