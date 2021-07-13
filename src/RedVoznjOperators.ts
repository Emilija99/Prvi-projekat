import { map } from "rxjs/operators";
import * as API from "./ApiMethods";
import Route from "./models/Route";
import { debounceTime, switchMap } from "rxjs/operators";
import { from, fromEvent, Observable, OperatorFunction } from "rxjs";
import Departure from "./models/Departure";
import { sortAndFilterDepartures } from "./SortAndFilterFunc";



export function AutocompleteRouteObservable(
  attribute: string
): OperatorFunction<string, Route[]> {
  return (source: Observable<string>) => {
    return source.pipe(
      switchMap((substring: string) => {
        return from(
          API.findRoutesWithAttributeStartingWith(attribute, substring)
        );
      })
    );
  };
}

export function FindRoutesObservable(
  attribute: string
): OperatorFunction<string, Route[]> {
  return (source: Observable<string>) => {
    return source.pipe(
      switchMap((str: string) => {
        return from(API.findRoutesWithAttributeValue(attribute, str));
      })
    );
  };
}

export function EmitRoute(): OperatorFunction<[string, string], Route> {
  return (source: Observable<[string, string]>) => {
    return source.pipe(
      switchMap((arr: [string, string]) => {
        return from(API.findRoute(arr[0], arr[1]));
      }),
      map((routes: Route[]) => routes[0])
    );
  };
}

export function EmitDepartures(): OperatorFunction<
  [Route, string],
  Departure[]
> {
  return (source: Observable<[Route, string]>) => {
    return source.pipe(
      switchMap(([route, time]) => {
        if (!route) return from([null]);
        else return from(API.findDeparturesLeavingAfter(route, time));
      })
    );
  };
}

export function EmitSortedAndFilteredDepartures(
  sortAndFilterParameters: Observable<[string, string, string]>
): OperatorFunction<Departure[], Departure[]> {
  return (source: Observable<Departure[]>) => {
    return source.pipe(
      switchMap((departures: Departure[]) =>
        sortAndFilterParameters.pipe(
          map(
            ([sortCriterium, filterCriterium, filterValue]: [
              string,
              string,
              string
            ]) => [sortCriterium, filterCriterium, filterValue, departures]
          )
        )
      ),
      map(([sc,fc,fv,ds]:[string,string,string,Departure[]])=>sortAndFilterDepartures(ds,sc,fc,fv))
    );
  };
}
