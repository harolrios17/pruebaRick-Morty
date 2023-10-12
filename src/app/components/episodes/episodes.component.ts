import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {

  episode: any[] = [];
  character: any[] = [];  
  episodesArray: any[] = [];  
  params = {} as any;
  params1 = {} as any;
  numberPages: number =0;
  page: number =1;
  p: number = 1;
  eName: string = '';
  eAirDate: string = '';
  eEpisode: string = '';

  constructor(private _apiService: ApiService){}

  ngOnInit(): void {
    this.params.page = 0;
    this.getAllEpisodes();
    this.getAllCharacters();
  }

  getAllEpisodes(){ 
    this.params.page = 0;     
    this._apiService.getEpisodes(this.page).subscribe({
      next: (res: any) => {          
        this.numberPages = res.info.pages;
        //console.log(this.numberPages);  
        for (let index = 0; index < this.numberPages; index++) {
          this.episode = [];
          this.getEpisode();            
        }       
      },
      error: (error: any) =>{}
    })
  }

  getEpisode(event?: any){
    this.params.page += 1;
    //console.log(this.params.page);
    this._apiService.getEpisodes(this.params).subscribe({
      next: (res: any) => {
        this.episode.push(...res.results)
        //console.log(this.character);
      },
      error: (error: any) =>{}
    })
  }

  searchEpisode(index: string){
    if(index){
      console.log('search')
      this.episode = this.episode.filter(x=>x.name.toLowerCase().includes(index));
    } 
    this.getAllEpisodes();
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
    this.eName = chr.name;     
    this.eEpisode = chr.episode;
    this.eAirDate = chr.air_date;
    console.log('residentes: '+chr.characters[0])
    console.log(this.character);
    for (let i = 0; i < chr.characters.length; i++) {
      for (let j= 0; j < this.character.length; j++) {        
        if (chr.characters[i] === this.character[j].url) {
          this.episodesArray.push(this.character[j].name);
        }
      }      
    }

    console.log('name: '+this.episodesArray);
 }
}
