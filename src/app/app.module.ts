import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
//routing
import { AppRoutingModule }           from './app-routing.module';
//Requests Rxjs observables
import { HttpClientModule,
        HTTP_INTERCEPTORS }           from '@angular/common/http';
// import { RoutingComponent } from './routing/routing.component';
//services
import { HttpService }                from './http.service';
// import { AuthService } from './services/auth.service';

//?
import { HomeComponent }              from './home/home.component';
//interceptors
import { ErrorinterceptorService }    from './interceptor/errorinterceptor.service';
import { JwtinterceptorService }      from './interceptor/jwtinterceptor.service';

//npm modules
import { CookieService }              from 'ngx-cookie-service';
import { StoreService }               from './services/store.service';
import { AboutmeComponent } from './aboutme/aboutme.component';

//Angular Materials
import { BrowserAnimationsModule }from'@angular/platform-browser/animations';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  //Array of Components. dvs delar av ett program.
  //lägg dina komponenter här this application's lone component.
  imports: [
    //contains feature models -> modules i've created with ng generate module name
    //and root modules.
    BrowserModule, //root module
    AppRoutingModule, //root module
    HttpClientModule, //root module
    BrowserAnimationsModule, // angular materials.
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
  ],
  //declare your Components
  //often only one when using routing-module lazy-loading
  declarations: [
    AppComponent,
    AboutmeComponent,
  ],

  //Providers definiera dependency-injection-modules
  providers: [HttpService, CookieService, StoreService,
    //HTTP_INTERCEPTORS gör det möjligt att kapa signalen i httprequests
    //Injector avger en array av instanser om multi är satt till true,
    //annars ett värde.
    { provide: LOCALE_ID, useValue: localStorage.getItem('locale') },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true },
  ],
  //shared modules just makes sure that the modules exported is
  //not crashed with other modules?
  exports: [  MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, FlexLayoutModule],

  //providers—the service providers.
  //bootstrap—the root component that Angular creates and inserts into the index.html host web page.
  bootstrap: [AppComponent]
})
export class AppModule {
 }
