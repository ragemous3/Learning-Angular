import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { switchMap }                from 'rxjs/operators';

//authguard is keeping track of logged in status
import { AuthGuard }                from './auth/auth.guard';

/*
  Det här är själva moderskeppet
  Där man kan kontrollera allt från toppen(eller botten beroende på hur du ser på saken)
*/
/*
  This is a lazy-loading solution when we convert our Components
  into modules wich we import through our rotes object here.

*/
const routes: Routes = [

  {
    path:"", //säger vart skiten skall gå om url:en är tom.
    //det skapas en modul till komponenten för att routing ska bli valid
    // loadChildren: () => import("./logger/logger.module")
    // .then(mod => mod.LoggerModule),
    redirectTo:"login",
    pathMatch: "full",
  },
  {
    path:"about", //säger vart skiten skall gå om url:en är tom.
    //det skapas en modul till komponenten för att routing ska bli valid
    loadChildren: () => import("./aboutme/aboutme.module")
    .then(mod => mod.AboutmeModule),
    pathMatch: "full",
  },
  {
    path:"login", //säger vart skiten skall gå om url:en är tom.
    //det skapas en modul till komponenten för att routing ska bli valid
    loadChildren: () => import("./logger/logger.module")
    .then(mod => mod.LoggerModule),
    pathMatch: "full",
  },
  {
    path: "create", //specificera componentnamn
    loadChildren: () => import("./coolcomp/coolcomp.module")
    .then(mod => mod.CoolcompModule), //modulen laddas ur returneringsobjektet.
    pathMatch: "full",
  },
  {
    path: "home", //specificera componentnamn
    canActivate: [AuthGuard],
    loadChildren: () => import("./home/home.module")
    .then(mod => mod.HomeModule), //modulen laddas ur returneringsobjektet.
    pathMatch: "full",
  },
  //{ path: '**', component: PageNotFoundComponent }
  //glob-pattern wildcard som betyder "vid ingen mathchning"
];
// { enableTracing: true }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
