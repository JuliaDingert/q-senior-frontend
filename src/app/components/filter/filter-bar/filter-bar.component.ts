import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterDef } from 'src/app/models/filterDef';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() filterDef: FilterDef[] = [];
  @Output() filterValueEvent = new EventEmitter<FilterValue>();
  @Output() resetFilterEvent = new EventEmitter<boolean>();

  resetFilterButtonClicked: boolean = false;

  /**
   * Sends search values from children to parent
   * @param eventData
   */
  onSearchValueAdded(eventData: any) {
    this.filterValueEvent.emit(eventData);
  }

  /**
   * triggers parent to reset filter
   */
  resetFilter() {
    this.resetFilterButtonClicked = !this.resetFilterButtonClicked;
    this.resetFilterEvent.emit(this.resetFilterButtonClicked);
  }
}

export interface FilterValue {
  name: string;
  value: any;
}
