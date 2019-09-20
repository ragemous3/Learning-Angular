import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-textcomponent',
  template: `
  <div class="flex-parent">
    <div class="flex-start">
      <input (change)="onChecked($event)" #checkboxes id={{id}} type="checkbox" class="flex-items-1">
    </div>
    <div class="flex-middle">
      <p class="flex-items-2" contenteditable #editable >{{txt}}</p>
    </div>
    <div class="flex-end">
      <button class="flex-items-3" (click)="onInput(editable, checkboxes)">Update</button>
    </div>
  </div>

`,
  styleUrls: ['./textcomponent.component.css'],
})

export class TextInputComponent implements OnInit {

  //fan fungerar input igen?
  //parent component share the data.
  @Input() public txt:string;
  @Input() public id:string;
  @Output() public toParent = new EventEmitter<any>();
  @Output() public inputParent = new EventEmitter<any>();

  constructor() {

  }

  onChecked(e:any){
    this.toParent.emit(e);
  }
  onInput(editable, checkbox){
    this.inputParent.emit({
      editable: editable,
      elemtn: checkbox
    })
  }
  ngOnInit() {
  }

}
