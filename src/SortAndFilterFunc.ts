import Departure from "./models/Departure";

const filter={

}

export function sortAndFilterDepartures(
  departures: Departure[],
  sortCriterium: string,
  filterCriterium: string,
  filterValue: string
):Departure[] {
    if(departures)
      return sortDepartures(filterDepartures(departures,filterCriterium,filterValue),sortCriterium);
    else return null;
}

function sortDepartures(
  departures: Departure[],
  sortCriterium: string
): Departure[] {

    return departures.sort(compareFunction(sortCriterium));
}

function filterDepartures(departures:Departure[],filterCriterium:string,filterValue:string):Departure[]{

    let attribute:string;
   // console.log(parseInt(filterValue));
   // console.log(departures);
    
    if(filterCriterium==='Cena manja od'){
        attribute='price';
        
    }
    else{ attribute='companyName';
}
   return !filterValue?departures:departures.filter((departure:Departure)=>{
       console.log(departure.price);
     return  attribute==='price'
       ?departure.price<parseInt(filterValue)
       :departure[attribute].toString().toLowerCase()===filterValue.toLowerCase()})

}

const compareFunction = (property: string) => {
  return function (a: Departure, b: Departure) {
   

    if (property === "Vreme putovanja") {
      return (
        calculateDifferenceBetweenTimes(a.departureTime, a.arrivalTime) -
        calculateDifferenceBetweenTimes(b.departureTime, b.arrivalTime)
      );
    }
    else{
        const attribute=property==='Cena'?'price':'departureTime'
        if(a[attribute]<b[attribute])
        return -1;
        if(a[attribute]>b[attribute])
        return 1;
        return 0;

    }
  };
};

const calculateDifferenceBetweenTimes = (
  time1: string,
  time2: string
): number => {
  const t1 = new Date(time1);
  const t2 = new Date(time2);
  const rez = t2.getTime() - t1.getTime();
  return rez;
};
