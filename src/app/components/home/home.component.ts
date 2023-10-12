import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  
  character: any[] = [];  
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


  constructor(private _apiService: ApiService){
    this.params.page = 0;
      this.getAllCharacters();
  }

    ngOnInit(): void {
      
    }

    getAllCharacters(){ 
      this.params.page = 0;     
      this._apiService.getCharacters(this.page).subscribe({
        next: (res: any) => {          
          this.numberPages = res.info.pages;
          console.log(this.numberPages);  
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
      //console.log(this.params.page);
      this._apiService.getCharacters(this.params).subscribe({
        next: (res: any) => {
          this.character.push(...res.results)
        },
        error: (error: any) =>{}
      })
    }

    searchCharacter(index: string){      
      if(index){        
          this.character = this.character.filter(x=>x.name.toLowerCase().includes(index));
                 
      }
      else {
        this.getAllCharacters();
      }
      
    }

    openModal(chr: any){
      this.cName = chr.name;
      this.cStatus = chr.status;
      this.cSpecies = chr.species
      this.cType = chr.type;
      this.cGender = chr.gender;
      this.cOrigin = chr.origin.name;
      this.cImage = chr.image;
    }
}
