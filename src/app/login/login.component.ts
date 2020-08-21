import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  error: boolean;
  errorMsg: string;

  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  login(){
    console.log(this.userLoginForm.value)
    this.userService.login(this.userLoginForm.value);
  }

  ngOnInit(): void {
  }

}
