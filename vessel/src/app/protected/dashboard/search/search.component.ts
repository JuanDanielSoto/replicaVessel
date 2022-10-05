import { Component, Input } from '@angular/core';
import { Vessel } from '../../interfaces/mongoInter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() vessel!: Vessel;
  private debouncerTimer?: NodeJS.Timeout;

  constructor() { }

  onQueryChanges(query: string = "") {
    if (this.debouncerTimer) clearTimeout(this.debouncerTimer);
    this.debouncerTimer = setTimeout(() => {
      console.log("Mandar este Query:", query);
    }, 500);
  }

}
