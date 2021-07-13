import './SortAndFilterForm.scss'


export class SortAndFilterForm{

    
    private container:HTMLElement;
    sortSelect:HTMLSelectElement;
    filterSelect:HTMLSelectElement;
    filterValue:HTMLInputElement;

    

    drawForm(host:HTMLElement){
        this.container=document.createElement('div');
        host.appendChild(this.container);
        this.container.className='sortAndFilter'

        this.drawSortSelect();
        this.drawFilterSelect();
        this.drawInputWithLabel(this.container,'Filter vrednost');

        }

    drawSortSelect(){
       
        const options=['Vreme polaska','Cena','Vreme putovanja'];
       this.sortSelect= this.drawSelectFieldWithLabel(this.container,'Sortiraj po',options);
    }

    drawFilterSelect(){
       
        const options=['Cena manja od','Auto prevoznik'];
       this.filterSelect= this.drawSelectFieldWithLabel(this.container,'Filtriraj po',options);
      
    }

    drawInputWithLabel(host:HTMLElement,label:string){
        const kont=document.createElement('div');
        host.appendChild(kont);
        this.drawLabel(kont,label);
        this.drawFilterInput(kont);
        
    }

    drawFilterInput(host:HTMLElement){
        const filterInput=document.createElement('input');
        filterInput.type='text';
        host.appendChild(filterInput);
        this.filterValue=filterInput;
    }

    drawSelectFieldWithLabel(host:HTMLElement,label:string,optionValues:string[]):HTMLSelectElement{
        const kont=document.createElement('div');
        host.appendChild(kont);
        this.drawLabel(kont,label);
         return this.drawSelectField(kont,optionValues);

    }

    drawSelectField(host:HTMLElement,optionValues:string[]):HTMLSelectElement{
       
        const select=document.createElement('select');
        host.appendChild(select);
        optionValues.forEach(option=>{
            const op=document.createElement('option');
            select.appendChild(op);
            op.innerHTML=option;
            op.value=option;

        })
        return select;


    }

    drawLabel(host:HTMLElement,label:string){
        const lbl=document.createElement('label');
        host.appendChild(lbl);
        lbl.innerHTML=label;

    }

    
}