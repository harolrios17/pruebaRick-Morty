import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocationsComponent } from './components/locations/locations.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { ListSearchComponent } from './components/list-search/list-search.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'locations', component: LocationsComponent },
    { path: 'search/:termino', component: ListSearchComponent },
    { path: 'episode', component: EpisodesComponent },
    { path: '**', pathMatch: 'full',  redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);