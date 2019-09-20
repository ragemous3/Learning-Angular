import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
//https://angular.io/guide/forms
//services
import { HttpService } from '.././http.service';
//rxjs
//(ngSubmit) Postar skiten i urlen automatiskt
///(submit) tillåter preventDefault
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';
//rxjs
import {first} from 'rxjs/operators';

//materials
import {MatSnackBar} from '@angular/material/snack-bar';

/*
First will deliver an EmptyError to the Observer's
error callback if the Observable completes before any next notification was sent

predicate;
A logical expression which evaluates to TRUE or FALSE,
normally to direct the execution path in code.
*/

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})

export class Logger {
  loading: boolean = false;
  returnUrl:string;
  error = '';
  username = new FormControl('');
  password = new FormControl('');
  snackbar: any;

  loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password
  });

  constructor(
    private test: HttpService,
    private builder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snacky: MatSnackBar
  ) {

  }

  ngOnInit() { //componentDidMount
    this.loading = true;
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
       if (this.auth.currentUserValue) {
         console.log('inside');
          //om det finns värde i auth här så är det bara att logga in.
         this.router.navigate(['/home']);
      }
  }
  ngOnDestroy():void {
    this.loading = false;
  }

  login():void {

    var json = JSON.parse(JSON.stringify({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }));

    console.log(json);
    this.auth.login(json).pipe(first())
    .subscribe(
      data => {
        console.log('Data back');
          this.router.navigate(['/home']);
      },
      error => {
          this.error = error;
          this.loading = false;
          this.snacky.open('Wrong password or username', 'remove', {
              duration: 3000
          })
          });
  }
}
