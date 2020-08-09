import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthguardGuard } from './guards/authguard.guard';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'login'},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'user', component: UserComponent, canActivate: [AuthguardGuard]},
{path: 'user/updateinfo', component: UpdateUserInfoComponent, canActivate: [AuthguardGuard]},
{path: 'user/updatepass', component: UpdatePasswordComponent, canActivate: [AuthguardGuard]},
{path: '**', redirectTo:'login'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
