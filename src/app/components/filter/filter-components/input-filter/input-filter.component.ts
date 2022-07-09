import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements OnChanges {
  @Input() placeholder: string;
  @Input() label: string;
  @Output() inputEvent = new EventEmitter<FilterValue>();
  @Input() isResetted: boolean;

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
    this.inputEvent.emit({ name: this.label, value: this.value });
  }
}
