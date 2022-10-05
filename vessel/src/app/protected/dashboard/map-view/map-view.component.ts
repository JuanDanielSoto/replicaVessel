import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map, Popup, Marker } from 'mapbox-gl';
import { Vessel } from '../../interfaces/mongoInter';
import { MapService } from '../../services';
import { MongoService } from '../../services/mongo.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit, OnInit {

  @Output() onVessel: EventEmitter<Vessel> = new EventEmitter<Vessel>();

  @ViewChild("mapDiv") mapDivElement?: ElementRef;
  vessel!:Vessel;

  constructor(private placesService: PlacesService,
    private mapService: MapService,
    private mongoService: MongoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.mongoService.getCoors(params.id).subscribe(res => {
        this.vessel = res;
        this.onVessel.emit(this.vessel);
        const map = new Map({
          container: this.mapDivElement?.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [this.vessel.Lon, this.vessel.Lat], // starting position [lng, lat]
          zoom: 6, // starting zoom
        });
        const popup = new Popup()
          .setHTML(`
            <h6>${this.vessel.Vessel_Name}</h6>
            <img src=${this.vessel.Photo} style="height: 100px;width: 200px;">
          `);
        new Marker({ color: "red" })
          .setLngLat([this.vessel.Lon, this.vessel.Lat])
          .setPopup(popup)
          .addTo(map);
        this.mapService.setMap(map);
      });
      this.mongoService.updateCoors(params.id).subscribe(res => {
        this.vessel.Lat = res.lat;
        this.vessel.Lon = res.lon;
      });
    });
  }

  ngAfterViewInit(): void{

  }


}
