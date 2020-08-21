import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreService {

  initPlayers: Array<User> = [];

  constructor() { }

  private readonly _users = new BehaviorSubject<Array<User>>(this.initPlayers);
  readonly users$: Observable<Array<User>> = this._users.asObservable();

  private get users(): Array<User>{
    return this._users.getValue();
  }

  private set users(users: Array<User>){
    this._users.next(users)
  }

  addPlayers(users: Array<User>){
    this.users = users;
  }

  byUsername(username: string){
    return this.users$.pipe(map(users => users.filter(a => a.username.toLowerCase() === username.toLowerCase())))
  }

}
