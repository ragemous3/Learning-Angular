import { Component }                                        from '@angular/core';
import { AuthService }                                      from './services/auth.service';
import { Router }                                           from '@angular/router';

//interfaces
import { User }                                             from './models/user';
import { Token }                                            from './models/Token';



@Component({
  //https://stackoverflow.com/questions/37091718/what-exactly-does-a-selector-do-in-angular-2
  //selector är som en "handle" som du använder i index.html
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [ ActivatedRouteSnapshot, RouterStateSnapshot]
})


export class AppComponent {
  title = 'Test';
  currentUser: Token;
  
  constructor(
    private router: Router,
    private authenticationService: AuthService
    ) {
        //från rooten applicerar vi CurrentUser.
          this.authenticationService.currentUser.subscribe((x) =>
          {this.currentUser = x});
    }

    changeLang(){
      if(localStorage.getItem('locale') == 'se'){
        localStorage.setItem('locale', 'en');
      }else{
        localStorage.setItem('locale', 'se');
      }
      console.log('changing lang...');
      location.reload();
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
