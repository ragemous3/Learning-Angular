import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

//This module uses rxjs Subjet to share subscriptions between components.

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  subject = new Subject<any>(); //store

  // constructor() { }


}
