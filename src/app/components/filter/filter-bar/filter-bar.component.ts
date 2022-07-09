import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterDef } from 'src/app/models/filterDef';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() filterDef: FilterDef[] = [];
  @Output() filterValue = new EventEmitter<FilterValue>();

  /**
   * Sends search values from children to parent
   * @param eventData
   */
  onSearchValueAdded(eventData: any) {
    this.filterValue.emit(eventData);
  }
}

export interface FilterValue {
  name: string;
  value: any;
}
