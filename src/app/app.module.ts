import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LocationsComponent } from './components/locations/locations.component';
import { NgxPaginationModule } from 'ngx-pagination';

//servicios
import { ApiService } from "./services/api.service";
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { ListSearchComponent } from './components/list-search/list-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LocationsComponent,
    EpisodesComponent,
    ListSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    APP_ROUTING
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
