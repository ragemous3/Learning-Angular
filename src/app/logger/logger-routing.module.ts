import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { Logger }                   from './logger.component';

//grattis du har skapat din första feature model
//här kan du lägga in alla routes som är associerade med denna.
const routes: Routes = [
  {
    path:"",  //första routen måste vara clear för att det ska fungera i en feature model
    component: Logger,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoggerRoutingModule { }
