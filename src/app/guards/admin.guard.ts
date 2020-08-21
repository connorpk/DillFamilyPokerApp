import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user/user-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router, private snackbar: MatSnackBar){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.userStore.$user.pipe(map(user =>{
    //   if(user.admin){
    //     return true
    //   }
    //   this.router.navigate(["/login"])
    //   this.snackbar.open("User isn't an admin.", 'close', {duration: 5000})
    //   return false
    // }));
    return true
  }
  }
