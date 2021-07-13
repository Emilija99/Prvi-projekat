import { combineLatest, fromEvent } from "rxjs";
import { DeparturesView } from "./view/DeparturesView";
import { FormView } from "./view/FormView";
import * as obs from './RedVoznjOperators'
import { RedVoznjeView } from "./view/RedVoznjeView";


const naslov=document.createElement('h2');
document.body.appendChild(naslov);
naslov.innerHTML='Red voznje'
const rv=new RedVoznjeView();
rv.draw(document.body);