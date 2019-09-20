import { Injectable } from '@angular/core';
import { AuthService } from '.././services/auth.service';

import {HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Supposed to catch the signal and insert a authentication-header with the
//token from auth-service. ((where it is stored in a subject)). IF THE USER IS LOGGED IN
//tat is if currentUserValue Holds any value.
export class JwtinterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let currentUser = this.auth.currentUserValue;
    // console.log('interception Http Request')
    // console.log(`Current value is currently ${currentUser}`);
    if(currentUser){
      request = request.clone({
        setHeaders:{
            auth: `${currentUser}`
        }
      })
    }
    return next.handle(request);
  }
}
