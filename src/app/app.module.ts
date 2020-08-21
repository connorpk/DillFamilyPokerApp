import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MaterialModule } from './materialModule';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    SignupComponent,
    LoginComponent,
    UpdatePasswordComponent,
    UpdateUserInfoComponent,
    UserComponent,
    AdminComponent,
    PlayerlistComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
