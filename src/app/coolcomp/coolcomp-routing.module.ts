import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoolcompComponent } from './coolcomp.component';

  /*
    Det här är alltså routing modulen till DENNA komponent
    "coolcomp". Här ger du instruktioner till Angular

    Fråga läraren om alla mappar skall ha en routing-module
  */


//en routing fil tar alltid in DEN komponents vars den befinner sig.
const routes: Routes = [
    {
      path:"", //första routen måste vara clear för att det ska fungera i en feature model
      component: CoolcompComponent
    }
];
//it's own module ((a feature module wich we import our router into))
//next step is to put in "imports"
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoolcompRoutingModule { }
