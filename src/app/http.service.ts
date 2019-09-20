import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpEvent, HttpHeaders } from '@angular/common/http';

//rxjs library
import { throwError, Observable } from 'rxjs';
import { catchError, retry, tap, mapTo, map, flatMap } from "rxjs/operators";
//interfaces
import { Forhttp } from "./forhttp";
import { Userinfo } from "./userinfo";
//services
import { AuthService } from './services/auth.service';


interface Token {
  token: JSON
}
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  data: Forhttp;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  // verify(body): Observable<HttpResponse<any>>{
  //   return this.http.post<HttpResponse<any>>('http://localhost:3000/login', body, {observe:"response"})
  //   .pipe(
  //       // tap(tokens => this.authService.testCredentials()),
  //     catchError(this.handleError)
  //   );
  // }

  public userPost(userinf: any):Observable<any>{
    console.log(`sending... ${userinf}`);
    return this.http.post<any>('http://localhost:3000/posttext', userinf).pipe(
      catchError(this.handleError)
    )
  }
  public updatePosts(txtpost:any):Observable<any>{
    console.log(txtpost);
    return this.http.put<any>('http://localhost:3000/updatetext', txtpost).pipe(
      catchError(this.handleError)
    )
  }
  public getPosts():any{
    return this.http.get<any>('http://localhost:3000/textposts').pipe(
      flatMap(res => [res._post_id]),
      catchError(this.handleError)
    )
  }
  public deleteTxt(pgk:any):Observable<any>{
      console.log(pgk);
      let length = pgk.id.length;
      let x:number;
      for(let i = 0; i < length; i++){
        if((x = pgk.id.indexOf('-')) !== -1){
          pgk.id.splice(x, 1);
        }
      }
    return this.http.delete<any>('http://localhost:3000/deleteText/' + pgk.id).pipe(
      catchError(this.handleError)
    )

  }
  public postInfo(userinf: Userinfo): Observable<Token> {
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests
    // headers.append('authentication', `${req.token}`);
    //    headers.append('Content-Type', 'application/json');
    let options = {
       headers: this.headers
    }
    // let options= new RequestOptions({ headers: headers });
    console.log(`sending... ${userinf}`);
    return this.http.post<Token>('http://localhost:3000/create', userinf, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(e: HttpErrorResponse) {
    if (e.error instanceof ErrorEvent) {
      console.error('client side error: ', e.error.message);
    } else {
      console.error(e);
      console.error(
        `Backend returned code ${e.status} and body was ${e.error}`
      )
    }
    return throwError(e);
  }
}
