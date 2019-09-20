import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '.././services/auth.service';

/*
by extending the HttpInterceptor class you can create a custom interceptor
to catch all error responses from the server in a single location.
*/

@Injectable({
  providedIn: 'root'
})
export class ErrorinterceptorService implements HttpInterceptor {
  //httpinterceptor måste ha en intercept-prop.
  /*
  intercept proppen kan instrueras att ta alla "catcHError och skicka hit";
  */
  constructor(private auth: AuthService, ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //Http Handler: transforms an HttpRequest into a stream of HttpEvents,
    //one of which will likely be a HttpResponse.
    //next.handle(request) är samma sak som "hantera den här strömmen av requests
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.auth.logout();
          //logga ut och reloada sidan
          location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
  }))

  }


}
