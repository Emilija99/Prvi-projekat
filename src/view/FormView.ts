import { AutocompleteInput } from "./AutocompleteInput";
import * as Operators from '../RedVoznjOperators'
import { EmitValuesFromInput } from "../Observables";
import Route from "../models/Route";
import { map } from "rxjs/operators";
import './FormView.scss'

export class FormView{

    private container:HTMLElement;
     destinationInput:AutocompleteInput;
     startInput:AutocompleteInput;
     timeInput:HTMLInputElement;

    constructor(){
        this.startInput=new AutocompleteInput('startingPoint','Unesite polaziste:');
        this.destinationInput=new AutocompleteInput('destination','Unesite odrediste:');
    }

    draw(host:HTMLElement){
        this.container=document.createElement('div');
        this.container.className='formKont'
        host.appendChild(this.container);

        this.drawStationForm('startingPoint','Unesite polaziste',this.startInput);
        this.drawStationForm('destination','Unesite odrediste',this.destinationInput);
        this.drawDateTimeInput(this.container);

       
       
    }

   

    drawStationForm(type:string,labl:string,a:AutocompleteInput){

        const stationKont=document.createElement('div');
        this.container.appendChild(stationKont);
       
        a.draw(stationKont);
        a.inputEl.classList.add(type+'Input');
        //input=a.inputEl;

        const lbl=document.createElement('div');
        lbl.innerHTML='Nadjene stanice:'
        lbl.className='stationsLbl'
        stationKont.appendChild(lbl);

        const stationList=document.createElement('div');
        stationList.className='foundList';
        stationList.classList.add(type+'List');
        stationKont.appendChild(stationList);
        this.makeStationList(a.inputEl,type);



    }

    drawDateTimeInput(host:HTMLElement){
        const dateTimeKont=document.createElement('div');
        host.appendChild(dateTimeKont);

        const label=document.createElement('h5');
        label.innerHTML='Pocev od:';
        dateTimeKont.appendChild(label);

        const dateTimeInput=document.createElement('input');
        this.timeInput=dateTimeInput;
        dateTimeKont.appendChild(dateTimeInput);
        dateTimeInput.type='datetime-local';
        dateTimeKont.className='dateTime';



    }

  //  drawDestinationForm(){
   //     const a=new AutocompleteInput('destination','Unesite odrediste').draw(this.container);

   // }

    

    drawList(listKont:HTMLElement,list:string[],type:string){
        listKont.innerHTML='';
        list.forEach(val=>{
            const listItem=document.createElement('div');
            listItem.innerHTML=val;
            listKont.appendChild(listItem);
            listItem.onclick=()=>{
                
                const input=this.container.querySelector(`.${type}Input`) as HTMLInputElement;
                input.value=val;
                console.log(this.destinationInput);
                const e=new Event('input');
                type==='startingPoint'?this.startInput.cancelAutocomplete():this.destinationInput.cancelAutocomplete();
                input.dispatchEvent(e);
               


            }
            
        })


    }

    makeStationList(el:HTMLInputElement,attribute:string){
            EmitValuesFromInput(el).pipe(
            Operators.FindRoutesObservable(attribute),
            map((routes:Route[]) =>
          routes.map((route:Route) =>
            attribute === "startingPoint"
              ? route.destination
              : route.startingPoint
          )
        )
        ).subscribe((stations:string[])=>{
            //console.log(stations);
           // console.log('event happened');
            const type=attribute==='startingPoint'?'destination':'startingPoint'
            const listName=type+'List';
            const listKont=this.container.querySelector(`.${listName}`)
            stations.sort();
            this.drawList(listKont as HTMLElement,stations,type);

            

        })


    }

}