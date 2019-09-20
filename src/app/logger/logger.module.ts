import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoggerRoutingModule } from './logger-routing.module';
import { Logger } from './logger.component';

//materials
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from '@angular/material/button';


import {MatSnackBarModule} from '@angular/material/snack-bar';
//grattis du har skapat din första feature model-
@NgModule({
  declarations: [Logger],
  imports: [
    CommonModule,
    LoggerRoutingModule,
    ReactiveFormsModule,
     FormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatCardModule,
     FlexLayoutModule,
     MatButtonModule,
     MatSnackBarModule,
  ]
})
export class LoggerModule { }
