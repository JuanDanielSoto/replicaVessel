import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vessel } from '../../interfaces/mongoInter';
import { MapService } from '../../services';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() vesselProp!: Vessel;
  keys: string[] = [];
  values: any[] = [];

  constructor() {

  }

  ngOnInit() {
    for (let item in this.vesselProp) {
      this.values.push(item);
    }
  }
}
