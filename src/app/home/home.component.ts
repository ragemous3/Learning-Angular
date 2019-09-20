import {  Component, OnInit, ViewChildren,  AfterViewInit, ViewChild, AfterContentInit, ContentChildren, ContentChild, QueryList, ElementRef } from '@angular/core';
import { HttpService } from '.././http.service';
import { AuthService } from '.././services/auth.service';

//interfaces
import { Data } from '.././models/data';
import { TxtInp } from './models/textInput';

//
import { TextInputComponent } from './textcomponent/textcomponent.component';
//other Components



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit,  AfterContentInit {
 // @ViewChildren('contentC') userTxt:  TextInputComponent;
 // @ViewChild("viewthis", {static:false}) public userTxt: TextInputComponent;
 //QueryList<any>;
 // @ContentChildren("contentC") public userTxt: TextInputComponent;
 //, {read:ElementRef}
 @ViewChildren("viewthis") txtComp: QueryList<TextInputComponent>;

  postData: {};
  textPosts: TxtInp[];
  amount: number;

  isMarked: boolean;

  updatePackage = {
    id: [],
    texts: [],
  }

  removePackage = {
    username: this.auth.currentUserName,
    id: new Array(),
  }

  constructor(
    private service: HttpService,
    private auth: AuthService,
) {}
  ngOnInit(){}

  ngAfterContentInit(){
    // console.log(this.txtComp);
  }

  ngAfterViewInit(){
    // console.log(this.txtComp);
  }
  input(obj){

    for(let i = 0; i < this.textPosts.length;i++){
      if(this.textPosts[i].id == obj.elemtn.id){
        this.textPosts[i].text = obj.editable.innerHTML;
        this.updatePackage.id.push(obj.elemtn.id);
        this.updatePackage.texts.push(obj.editable.innerHTML)
      }
    }
    console.log(this.updatePackage);
    //do update
    if(this.updatePackage !== undefined || this.updatePackage.id.length !== 0){
      this.service.updatePosts(this.updatePackage)
        .subscribe((res) => {
          console.log(res);
        },
        error => console.error(error)
      );
    }
    this.updatePackage.id = [];
    this.updatePackage.texts = [];

  }
  addStuff(inputData:string):void{
    this.postData = {
      username: this.auth.currentUserName,
      text: inputData
    }
    this.service.userPost(this.postData)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    )
  }
  receiveMessage(ev) {
    //check if checkBox is checked
    this.textPosts.forEach((obj, index) => {
      if (obj.id == null) {
          console.log('Instance is null or undefined');
      }else {
        if(obj.id == ev.target.id){
          obj.checked = ev.target.checked;
          this.isMarked = ev.target.checked;
        }
      }
    });

  }
  removeFromView(arr, index):void{
    console.log('Trying to remove index');
    arr.splice(index, 1);
  }
  removeStuff():void{
    var anyTrue: boolean = false;
    var temp:TxtInp[] = this.textPosts;
    //checking if any box is marked before continue;
    if(!this.isMarked) return;
    //nullfilling removepackage
    for(let i = 0; i < this.amount; i++){
      this.removePackage.id.push('-')
    }

    //transfering checked values to removepackage.
    this.textPosts.forEach((obj, index) => {
      if(obj.checked === true){
        anyTrue = true;
        //delete from view.

        this.removePackage.id.splice(index, 1, Number(obj.id));
      }
    })

    //remove from view;
    for(let i = this.amount; i >= 0; i--){
      if(temp[i]){
        if(temp[i].id == this.removePackage.id[i]){
          this.removeFromView(this.textPosts, i);
        }
      }
    }
    console.log(this.removePackage);
    //Deleting from database
    if(anyTrue){
      this.service.deleteTxt(this.removePackage)
      .subscribe((res) => {
        console.log(res);
      },
      error => console.log(error)
      );
      //resetting removepackage.
      this.removePackage.id = [];
      //locking function
      this.isMarked = false;
    }

  }
  updateFieldList():any{
    //måste upprätta en socket för att "auto-hämta värden". pallarnte
    this.service.getPosts().subscribe(
      (resp) => {
        this.amount = resp.length;
        this.textPosts = resp;
      },
      (error) => {
        console.error(error);
      }
    )
  }
  updateStuff(body):void{

  }
}
