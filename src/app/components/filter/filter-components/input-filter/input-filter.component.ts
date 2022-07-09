import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent {
  @Input() placeholder: string;
  @Input() label: string;
  @Output() enteredSearchValue = new EventEmitter<FilterValue>();

  value: string = '';

  /**
   * Sends input value via eventemitter to parent
   */
  sendSearchValue(): void {
    this.enteredSearchValue.emit({ name: this.label, value: this.value });
  }
}
