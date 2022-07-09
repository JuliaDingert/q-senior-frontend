import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnChanges {
  @Input() label: string;
  @Output() checkboxEvent = new EventEmitter<FilterValue>();
  @Input() isResetted: boolean;

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
    this.checkboxEvent.emit({ name: this.label, value: this.checked });
  }
}
