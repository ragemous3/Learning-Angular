import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoolcompRoutingModule } from './coolcomp-routing.module';
import { CoolcompComponent } from './coolcomp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
@NgModule({
  declarations: [CoolcompComponent],
  imports: [
    CommonModule,
    CoolcompRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
  ]
})
export class CoolcompModule { }
