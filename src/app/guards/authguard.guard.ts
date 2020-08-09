import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.$user.pipe(map(user =>{
      if(user.admin != null){
        return true
      }
      this.router.navigate(["/login"])
      return false
    }));
  }
  
}
