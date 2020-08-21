import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../shared/classes/errorStateMatcher.classes';
import { passwordMatchValidator } from '../shared/functions/passwordMatchValidator.function';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  matcher = new MyErrorStateMatcher;

  showPassword: boolean = false;

  userSignupForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(48), Validators.pattern(/^[a-zA-Z0-9]*$/)])),
    firstname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])),
    lastname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(48), Validators.pattern(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)])),
    confirmPassword: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(48), Validators.pattern(/^\S*$/)]))
  }, {validators: passwordMatchValidator})

  constructor(private userService: UserService) { 
    this.matcher = new MyErrorStateMatcher();
  }


  signup(){
    this.userService.signup(this.userSignupForm.value);
    console.log(this.userSignupForm.value);
  }

  ngOnInit(): void {
  }

}
