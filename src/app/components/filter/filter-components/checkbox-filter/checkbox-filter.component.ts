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
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnChanges {
  @Input() filterDef: FilterDef;
  @Input() isResetted: boolean;
  @Output() checkboxEvent = new EventEmitter<FilterValue>();

  checked: boolean = false;

  ngOnChanges(): void {
    if (this.isResetted) {
      this.checked = null;
    }
  }

  /**
   * Sends checkbox state via eventEmitter to parent
   * @param value current checkbox state
   */
  clickCheckbox(value) {
    this.checked = value;
    this.checkboxEvent.emit({
      name: this.filterDef.filterAttributeName,
      value: this.checked,
    });
  }
}
