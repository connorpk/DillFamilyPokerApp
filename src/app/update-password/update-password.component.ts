import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../shared/classes/errorStateMatcher.classes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/functions/passwordMatchValidator.function';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  matcher = new MyErrorStateMatcher;
  
  showPassword: boolean = false;
  showPasswordOld: boolean = false;

  userPasswordChangeForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(48), Validators.pattern(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)])),
    confirmPassword: new FormControl('')
  }, {validators: passwordMatchValidator})

  constructor(private userService: UserService) {
    this.matcher = new MyErrorStateMatcher();
   }

   changePassword(){
     this.userService.updateUserPassword(this.userPasswordChangeForm.value);
   }

  ngOnInit(): void {
  }

}
