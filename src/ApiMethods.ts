import Route from "./models/Route";
import Departure from "./models/Departure";
import { environment } from "../environment";


export async function findRoutesWithAttributeValue(attribute:string,value:string):Promise<Route[]>{

    return fetch(`${environment.apiUrl}/routes?${attribute}=${value}`).then((response)=>{

        if(response.ok)
           return response.json();
          
        else throw new Error('Not found!');
    }).catch(er=>console.log(er));

}

export async function findRoutesWithAttributeStartingWith(attribute:string,substring:string):Promise<Route[]>{

    return fetch(`${environment.apiUrl}/routes?${attribute}_like=^${substring}`).then((response)=>{

        if(response.ok)
           return response.json();
          
        else throw new Error('Not found!');
    }).catch(er=>console.log(er));

}


export async function findRoute(startingPoint:string,destination:string):Promise<Route[]>{

    return fetch(`${environment.apiUrl}/routes?startingPoint=${startingPoint}&destination=${destination}`).then((response)=>{
        if(response.ok)
           return response.json();

        else throw new Error('Route not found!');

    }).catch(er=>console.log(er));
}


export async function findDeparturesForRoute(route:Route):Promise<Departure[]>{

    return fetch(`${environment.apiUrl}/routes/${route.id}/departures`).then(response=>{
        if(response.ok)
          return response.json();
        
        else throw new Error('Not found');
    }).catch(er=>console.log(er));
}

export async function findDeparturesLeavingAfter(route:Route,time:string):Promise<Departure[]>{

    return fetch(`${environment.apiUrl}/routes/${route.id}/departures?departureTime_gte=${time}`).then(response=>{
        if(response.ok)
          return response.json();
        
        else throw new Error('Not found');
    }).catch(er=>console.log(er));

}

