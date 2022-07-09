import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent {
  @Input() label: string;
  @Output() clickedCheckbox = new EventEmitter<FilterValue>();

  checked: boolean = false;

  /**
   * Sends checkbox state via eventEmitter to parent
   * @param value current checkbox state
   */
  clickCheckbox(value) {
    this.checked = value;
    this.clickedCheckbox.emit({ name: this.label, value: this.checked });
  }
}
