  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { Subscription } from "rxjs";
  // import { Injectable } from '@angular/core';
  //interfaces
  import { Forhttp } from '.././forhttp';
  import { Userinfo } from '.././userinfo';

  //services
  import { HttpService } from '.././http.service';
  import { HttpResponse } from '@angular/common/http';
  //helpers
  import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
  //rxjs
  import {Observable} from 'rxjs';
  import { map } from 'rxjs/operators';

  @Component({
    selector: 'app-coolcomp',
    templateUrl: './coolcomp.component.html',
    styleUrls: ['./coolcomp.component.css']
  })

  export class CoolcompComponent {
    userData: Userinfo
    loading: boolean = true;
    loadingText:string = "laddar";

    user: Observable<any>;

    username = new FormControl('');
    password = new FormControl('');
    password2 = new FormControl('');

    loginForm: FormGroup = this.fbuild.group({
      username: this.username,
      password: this.password,
      password2: this.password2

    });
    sub: Subscription;


    constructor(private getService: HttpService, private fbuild: FormBuilder) {}

    ngOnInit() {
      this.loading = false;
      console.log(this.showData());
    }

    ngOnDestroy(){
      this.sub.unsubscribe();
    }

    create(){

        var load = JSON.stringify({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        })
        //   this.sub =
      this.sub = this.getService.postInfo(JSON.parse(load))
        .subscribe((res) => {
          console.log(res);
        },
        error => console.log(error),
      );
      // console.log(this.sub);
    }
    showData(){
      //en observer? -> JA. Den observererar "observables". dvs http.service
      //den har tre argument, en som hämtar data, en som häntar eventuella
      //errors och en som notifierar när hämtningen är klar och 200 fått
      //från servern.
      // this.getService.getData()
      // .subscribe((data: Forhttp) => ((this.userData = {...data}),
      //   console.log(this.userData)
      //  ),
      //  error => console.log(error)
      //  );
    }
  }
