import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../services/user/user-store.service';
import { UserService } from '../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss']
})
export class UpdateUserInfoComponent implements OnInit {

  userUpdateForm = new FormGroup({
    firstname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])),
    lastname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(48), Validators.pattern(/^\S*$/)]))
  })

  constructor(private userStoreService: UserStoreService, private userService: UserService) { }

  updateInfo(){
    this.userService.updateUserInfo(this.userUpdateForm.value)
  }

  ngOnInit(): void {
    this.userStoreService.$user.subscribe((user)=>{
      console.log(user);
      this.userUpdateForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      })
    })
  }

}
