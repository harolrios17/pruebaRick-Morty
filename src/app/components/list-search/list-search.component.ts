import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {

  character: any[] = [];  
  characterResult: any[] = [];  
  params = {} as any;
  numberPages: number =0;
  page: number =1;
  p: number = 1;;
  cName: string = '';
  cStatus: string = '';
  cSpecies: string = '';
  cType: string = '';
  cGender: string = '';
  cOrigin: string = '';
  cImage: string = '';
  id:string = '';


  constructor(private activatedRoute:ActivatedRoute,
    private apiService:ApiService ) { 
      
      //this.getAllCharacters();
}

ngOnInit(): void {      
  this.params.page = 0;
  this.activatedRoute.params.subscribe ( params => {
    this.id = params['termino']
    this.getAllCharacters();
    this.searchCharacter(this.id);  
    
  })
}

// metodo para buscar personajes
getAllCharacters(){ 
  console.log('entró');
  this.params.page = 0;
  console.log('page '+this.params.page)     
  this.apiService.getCharacters(this.page).subscribe({
    next: (res: any) => {          
      this.numberPages = res.info.pages;      
      for (let index = 0; index < this.numberPages; index++) {
        this.character = [];
        this.getCharacter();            
      }       
    },
    error: (error: any) =>{}
  })
}

getCharacter(event?: any){
  this.params.page += 1;
  console.log('page in '+this.params.page) 
  this.apiService.getCharacters(this.params).subscribe({
    next: (res: any) => {
      this.character.push(...res.results)
    },
    error: (error: any) =>{}
  })
}

searchCharacter(index: string){   
  if(index){        
      this.character = this.character.filter(x=>x.name.toLowerCase().includes(index));      
      console.log(this.character);
  }
  else {
    this.getAllCharacters();
  }
  
}

// Modal para personajes
openModalC(chr: any){
  this.cName = chr.name;
  this.cStatus = chr.status;
  this.cSpecies = chr.species
  this.cType = chr.type;
  this.cGender = chr.gender;
  this.cOrigin = chr.origin.name;
  this.cImage = chr.image;
}
}
