import { combineLatest, fromEvent, merge, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import Departure from "./models/Departure";
import Route from "./models/Route";
import { EmitDepartures, EmitRoute} from "./RedVoznjOperators";

export function EmitValuesFromInput(
  input: HTMLInputElement
): Observable<string> {
  return fromEvent(input, "input").pipe(
    //debounceTime(1000),

    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value)
  );
}

export function emitSortingAndFilteringParameters(
  sortCriteriumInput: HTMLSelectElement,
  filterCriteriumInput: HTMLSelectElement,
  filterValueInput: HTMLInputElement
): Observable<[string, string, string]> {
  return merge(
    fromEvent(sortCriteriumInput, "input"),
    fromEvent(filterCriteriumInput, "input"),
    fromEvent(filterValueInput, "input")
  ).pipe(
    startWith([
      sortCriteriumInput.value,
      filterCriteriumInput.value,
      filterValueInput.value,
    ]),
    map((event: Event) => [
      sortCriteriumInput.value,
      filterCriteriumInput.value,
      filterValueInput.value,
    ])
  );
}

export function emitDeparturesFromInputes(
  startingPointInput: HTMLInputElement,
  destinationInput: HTMLInputElement,
  time: HTMLInputElement
): Observable<Departure[]> {
  return combineLatest([
    emitRouteFromInputs(startingPointInput, destinationInput),
    EmitValuesFromInput(time),
  ]).pipe(EmitDepartures());
}

function emitRouteFromInputs(
  startingPointInput: HTMLInputElement,
  destinationInput: HTMLInputElement
): Observable<Route> {
  return combineLatest([
    EmitValuesFromInput(startingPointInput),
    EmitValuesFromInput(destinationInput),
  ]).pipe(EmitRoute());
}
