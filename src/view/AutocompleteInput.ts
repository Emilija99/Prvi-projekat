import * as Obs from "../Observables";
import * as Operators from '../RedVoznjOperators'
import Route from "../models/Route";
import { findRoutesWithAttributeStartingWith } from "../ApiMethods";
import { map } from "rxjs/operators";
import './style.scss'

export class AutocompleteInput {
  private type: string;
  private container: HTMLElement;
   inputEl: HTMLInputElement;
  private label:string;
  private cancel:boolean;

  constructor(type: string,lbl:string) {
    this.type = type;
    this.label=lbl;
    this.cancel=false;
  }

  draw(host: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className='autokomplKont';
    host.appendChild(this.container);
    this.drawLabel();
    this.drawInput();

    const listContainer = document.createElement("div");
    this.container.appendChild(listContainer);
    listContainer.className = "listContainer";
   // console.log(listContainer);
    document.addEventListener("click", AutocompleteInput.closeAllLists);
   
  }

  drawLabel(){
    const label=document.createElement('h5');
    label.innerHTML=this.label;
    this.container.appendChild(label);
  }

  drawInput() {
    this.inputEl = document.createElement("input");
    this.inputEl.type = "text";
    this.inputEl.className='inputRoute';
    this.container.appendChild(this.inputEl);
    this.subscribeToRoutes(this.inputEl);
  }

  drawList(list: Set<string>) {
    if(!this.cancel){

    this.closePreviousList();
    const listKont = this.container.getElementsByClassName("listContainer")[0];
    console.log(listKont);
    const inputValue = this.inputEl.value;
    list.forEach((str) => {
      const listEl = document.createElement("div");
      listKont.appendChild(listEl);
      listEl.className='listItem'
      listEl.innerHTML =
        "<strong>" +
        str.substr(0, inputValue.length) +
        "</strong>" +
        str.substr(inputValue.length);
       listEl.onclick=()=>{
         this.inputEl.value=str;
         this.cancelAutocomplete();
         const e=new Event('input');
         this.inputEl.dispatchEvent(e);
         this.closePreviousList();
         
       }
     
    });
  }
  else this.cancel=false;
  }

  closePreviousList() {
    console.log(this.container);
    const listKont = this.container.getElementsByClassName("listContainer")[0];
    console.log(listKont);
    
    if(listKont)
    listKont.innerHTML="";
  }

  static closeAllLists(e:Event){

    const lists=document.getElementsByClassName('listContainer');
    for(let i=0;i<lists.length;i++){
      if(lists[i]!=e.target)
         lists[i].innerHTML="";

    }
      
    
      }

  cancelAutocomplete(){
    this.cancel=true;

  }

  subscribeToRoutes(input: HTMLInputElement) {
    Obs.EmitValuesFromInput(input)
      .pipe(
        Operators.AutocompleteRouteObservable(this.type),
        map((routes:Route[]) =>
          routes.map((route:Route) =>
            this.type === "startingPoint"
              ? route.startingPoint
              : route.destination
          )
        )
      )
      .subscribe((list:string[]) => {
          console.log(list);
          list.sort();
          const list1=new Set(list);
          
        this.drawList(list1);
      });
  }
}
