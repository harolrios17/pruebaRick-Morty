import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {

  location: any[] = [];
  character: any[] = [];  
  residentsArray: any[] = [];  
  params = {} as any;
  params1 = {} as any;
  numberPages: number =0;
  page: number =1;
  p: number = 1;
  lName: string = '';
  lType: string = '';
  lDimension: string = '';
  residentsChar: string = '';

  constructor(private _apiService: ApiService){}

  ngOnInit(): void {
    this.params.page = 0;
    this.getAllLocations();
    this.getAllCharacters();
  }

  getAllLocations(){ 
    this.params.page = 0;     
    this._apiService.getLocations(this.page).subscribe({
      next: (res: any) => {          
        this.numberPages = res.info.pages;
        //console.log(this.numberPages);  
        for (let index = 0; index < this.numberPages; index++) {
          this.location = [];
          this.getLocation();            
        }       
      },
      error: (error: any) =>{
       
      }
    })
  }

  getLocation(event?: any){
    this.params.page += 1;
    //console.log(this.params.page);
    this._apiService.getLocations(this.params).subscribe({
      next: (res: any) => {
        this.location.push(...res.results)
        //console.log(this.character);
      },
      error: (error: any) =>{}
    })
  }

  searchLocation(index: string){
    if(index){
      console.log('search')
      this.location = this.location.filter(x=>x.name.toLowerCase().includes(index));
    } 
    this.getAllLocations();
  }

  

  getAllCharacters(){ 
    this.params1.page = 0;     
    this._apiService.getCharacters(this.page).subscribe({
      next: (res: any) => {          
        this.numberPages = res.info.pages;
        //console.log(this.numberPages);  
        for (let index = 0; index < this.numberPages; index++) {
          this.character = [];
          this.getCharacter();            
        }       
      },
      error: (error: any) =>{}
    })
  }

  getCharacter(event?: any){
    this.params1.page += 1;
    //console.log(this.params.page);
    this._apiService.getCharacters(this.params1).subscribe({
      next: (res: any) => {
        this.character.push(...res.results)
        //console.log(this.character);
      },
      error: (error: any) =>{}
    })
  }

  openModal(chr: any){
    this.lName = chr.name;     
    this.lType = chr.type;
    this.lDimension = chr.dimension;
    console.log('residentes: '+chr.residents[0])
    console.log(this.character);
    for (let i = 0; i < chr.residents.length; i++) {
      for (let j= 0; j < this.character.length; j++) {        
        if (chr.residents[i] === this.character[j].url) {
          this.residentsArray.push(this.character[j].name);
        }
      }      
    }
 }
}
