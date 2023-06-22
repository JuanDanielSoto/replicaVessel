import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapViewComponent } from './dashboard/map-view/map-view.component';
import { LoadingComponent } from './dashboard/loading/loading.component';
import { SearchComponent } from './dashboard/search/search.component';
import { SearchResultsComponent } from './dashboard/search-results/search-results.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VesselDetailComponent } from './vessel-detail/vessel-detail.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MapViewComponent,
    LoadingComponent,
    MapViewComponent,
    SearchComponent,
    SearchResultsComponent,
    ListadoComponent,
    VesselDetailComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
