import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Characters } from '../characters';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

  @Injectable()
  export class ApiService{

    constructor(private http :HttpClient) {}

    getCharacters(params: any) {
      return this.http.get(environment.baseUrl + environment.character, { params });
    }

    getLocations(params: any) {
      return this.http.get(environment.baseUrl + environment.location, { params });
  }

  getEpisodes(params: any) {
    return this.http.get(environment.baseUrl + environment.episode, { params });
}


  }