import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user/user-store.service';
import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router, private snackbar: MatSnackBar){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.$user.pipe(map(user =>{
      if(user.active){
        return true
      }
      this.router.navigate(["/login"])
      this.snackbar.open("User hasn't been activated, please contact an administrator to give you permission.", 'close', {duration: 5000})
      return false
    }));
  }
  
}
