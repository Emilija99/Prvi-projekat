import { Observable } from "rxjs";
import Departure from "../models/Departure";
import "./DeparturesTable.scss";

export class DeparturesView {
  private departures: Departure[];
  private container: HTMLElement;

  subscribeToDepartures(departuresSource: Observable<Departure[]>) {
    departuresSource.subscribe((arr) => {
      this.departures = arr;
      console.log(arr);
      this.drawTableBody(this.container.querySelector("table"));
    });
  }

  draw(host: HTMLElement) {
    this.container = document.createElement("div");
    this.container.className = "tableKont";
    host.appendChild(this.container);
    this.drawTable(this.container);
  }

  drawTable(host: HTMLElement) {
    const table = document.createElement("table");
    table.className = "departuresTable";
    host.appendChild(table);
    this.drawTableHeader(table);
    this.drawTableBody(table);
  }

  drawTableHeader(host: HTMLElement) {
    const tableHeader = document.createElement("thead");
    host.appendChild(tableHeader);

    const fieldNames = [
      "Vreme polaska",
      "Vreme dolaska",
      "Cena (din)",
      "Auto prevoznik",
    ];
    fieldNames.forEach((val) => {
      const headerEl = document.createElement("th");
      headerEl.innerHTML = val;
      tableHeader.appendChild(headerEl);
    });
  }

  drawTableBody(host: HTMLElement) {
    let tableBody = this.container.querySelector("tbody");
    if (!tableBody) {
      tableBody = document.createElement("tbody");
      host.appendChild(tableBody);
    } else tableBody.innerHTML = "";

    if (this.departures)
      this.departures.forEach((departure) =>
        this.drawTableRow(tableBody, departure)
      );
  }

  drawTableRow(host: HTMLElement, departure: Departure) {
    const tableRow = document.createElement("tr");
    host.appendChild(tableRow);
    const attributeNames = [
      "departureTime",
      "arrivalTime",
      "price",
      "companyName",
    ];
    attributeNames.forEach((attribute) => {
     
      const value =
      attribute === "departureTime" || attribute=== "arrivalTime"
          ? new Date(departure[attribute]).toLocaleString()
          : departure[attribute].toString();
      this.drawTableField(tableRow, value);
    });
  }

  drawTableField(host: HTMLElement, value: string) {
    const td = document.createElement("td");
    host.appendChild(td);
    td.innerHTML = value;
  }
}
