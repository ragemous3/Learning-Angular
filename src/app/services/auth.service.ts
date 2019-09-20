import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { mapTo, map, tap } from "rxjs/operators";
import { StoreService } from "./store.service";
import { HttpClient } from '@angular/common/http';

//models
import { User } from '.././models/user';
import { Auth } from '.././models/auth';
import { Token } from '.././models/token';


/*

  Supposed to be the "mother" that handles all requests related to login

*/



//providedIn betyder att man inte behöver definiera
//dp-inj i "providers". Accepterad input är komponent
//eller 'root', vilket betyder att alla kan ta del av den.

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  //behaviourSubject är bara en klass som emittar payload till olika subbar.
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;
  public username: string;

  constructor(
    private http: HttpClient,
  ) {

      //ifall success så ska den emitta resultatet till alla  Components
      //redan vid instansiering.
        this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('auth')));

        //ger alla komponenter tillgång till authentication.
        //som en vanlig observable och tar bort subject-delen
        //nu kan alla subsribers subba på ett vanligt fucking värde.
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Token {
    //get returnerar något.
      return this.currentUserSubject.value;
  }
  public get currentUserName():any{
    console.log(this.currentUserSubject.value);
    if(this.currentUserSubject.value){
        let temp1:string;
          try{
            temp1 = String(localStorage.getItem('auth')).split('.')[1];
          }catch(e){
            console.error('Error at string conversion');
          }
        // let temp1 = localStorage.getItem('auth');
        this.username = window.atob(temp1);
        this.username = JSON.parse(this.username).user;
        return this.username;
    }
  }

  onDestroy(){
  }
  isLoggedIn():boolean{
    //Här ska en check göras med currentUserSubject.Value.
    if(this.currentUserValue){
      return true;
    }else{
      return false;
    }
  }
  //:Observable<any>
  login(user){
    return this.http.post<any>('http://localhost:3000/login', user).pipe(
      map(user => {
        localStorage.setItem('auth', JSON.stringify(user.token));
        //.next() emitterar resultat till alla som subbar.
        this.currentUserSubject.next(user); //emittar
        return user;
      }))
  }

  logout():void {
      // remove user from local storage to log user out
      localStorage.removeItem('auth');
      this.currentUserSubject.next(null); //emitta null till alla subbar.
  }

}
