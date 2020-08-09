import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStoreService } from './user-store.service';
import { UserRes } from '../interfaces/user.response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicRes } from '../interfaces/basic.response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  error: boolean;
  errorMsg: string;
  headers = new HttpHeaders().append("Authorization", `JWT ${localStorage.getItem("jwt")}`);

  constructor(private http: HttpClient, private userStoreService: UserStoreService, private snackBar: MatSnackBar, private router: Router) { }

  signup(newUser){
    this.http.post('/api/user/signup', newUser).subscribe((res: BasicRes)=>{
      console.log(res);
      this.snackBar.open(res.msg, 'close', {duration: 5000});
    })
  }

  login(user){
    console.log(user)
    this.http.post('/api/user/login', user).subscribe((res: UserRes)=>{
      console.log(res)
      if(res.success == false){
        this.snackBar.open(res.msg, 'close', {duration: 5000})
      }
      if(res.success){
      this.userStoreService.login(res.user);
      localStorage.setItem('jwt', res.jwt);
      }
    })
  }

  updateUserInfo(userInfo){
    this.http.put('/api/user/updateinfo', userInfo, {headers: this.headers}).subscribe((res: BasicRes)=>{
      console.log(res);
      this.snackBar.open(res.msg, 'close', {duration: 5000})
    })
  }

  updateUserPassword(userInfo){
    this.http.put('/api/user/updatepassword', userInfo, {headers: this.headers}).subscribe((res: BasicRes)=>{
      console.log(res); 
      this.snackBar.open(res.msg, 'close', {duration:5000})
    })
  }

}
