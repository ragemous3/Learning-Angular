import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '.././services/auth.service';

/*
  EN auth-guard är konstruerad att bara
  kommunicera med router-modulen. och hämta värden från authService.

*/


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  auth: boolean;
  token: string;
  constructor(
    private auth_service: AuthService,
    private router: Router,
    // private route: ActivatedRouteSnapshot,
    // private state: RouterStateSnapshot,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    const currentUser = this.auth_service.currentUserValue;

      if(currentUser){
        // this.router.navigate(['/home']);
        console.log('navigating to /home..')
        return true;
      }else{
        //route to home page.
        console.log('navigating to /login..')
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
      }

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
