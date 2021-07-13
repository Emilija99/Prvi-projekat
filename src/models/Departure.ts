export default interface Departure{
    [key: string]: string | undefined | number
    id:number,
    routeId:number,
    departureTime:string,
    arrivalTime:string,
    price:number,
    companyName:string
}