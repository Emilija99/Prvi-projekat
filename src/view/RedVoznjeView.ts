import { DeparturesView } from "./DeparturesView";
import { FormView } from "./FormView";
import { SortAndFilterForm } from "./SortAndFilterForm";
import * as operators from "../RedVoznjOperators";
import './RedVoznje.scss'
import {
  emitDeparturesFromInputes,
  emitSortingAndFilteringParameters,
} from "../Observables";

export class RedVoznjeView {
  private formView: FormView=new FormView();
  private sortAndFilterForm: SortAndFilterForm=new SortAndFilterForm();
  private departuresTable: DeparturesView=new DeparturesView();

  draw(host: HTMLElement) {
    const kont = document.createElement("div");
    host.appendChild(kont);
    kont.className='rvKont';

    this.drawForm(kont,'Unesite stanice:');
    this.drawDepartures(kont);
  }

  drawForm(host:HTMLElement,capture:string){
    const formKont=document.createElement('div');
    formKont.className='fKont';
    host.appendChild(formKont);
    this.drawCapture(formKont,capture);
    this.formView.draw(formKont);
  }

  drawDepartures(host:HTMLElement){
    const depKont=document.createElement('div');
    depKont.className='depKont';
    host.appendChild(depKont);
    this.drawCapture(depKont,'Nadjeni polasci:');
    this.sortAndFilterForm.drawForm(depKont);
    this.departuresTable.draw(depKont);
   
    this.subscribeToDepartures();
  }

  drawCapture(host:HTMLElement,capture:string){

    const naslov=document.createElement('h3');
    naslov.innerHTML=capture;
    host.appendChild(naslov);

  }

  subscribeToDepartures() {
    const departures$ = emitDeparturesFromInputes(
      this.formView.startInput.inputEl,
      this.formView.destinationInput.inputEl,
      this.formView.timeInput
    ).pipe(
      operators.EmitSortedAndFilteredDepartures(
        emitSortingAndFilteringParameters(
          this.sortAndFilterForm.sortSelect,
          this.sortAndFilterForm.filterSelect,
          this.sortAndFilterForm.filterValue
        )
      )
    );
    this.departuresTable.subscribeToDepartures(departures$);
  }
}
