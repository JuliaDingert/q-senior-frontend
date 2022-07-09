import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FilterDef } from 'src/app/models/filterDef';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements OnChanges {
  @Input() filterDef: FilterDef;
  @Input() isResetted: boolean;
  @Output() inputEvent = new EventEmitter<FilterValue>();

  value: string = '';

  ngOnChanges(): void {
    if (this.isResetted) {
      this.value = '';
    }
  }

  /**
   * Sends input value via eventemitter to parent
   */
  sendSearchValue(): void {
    this.inputEvent.emit({
      name: this.filterDef.filterAttributeName,
      value: this.value,
    });
  }
}
