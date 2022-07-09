import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
})
export class MultiselectFilterComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() jsonAttributeName: string = '';
  @Output() multiselectEvent = new EventEmitter<FilterValue>();
  @Input() isResetted: boolean;

  values: string[] = [];
  selectedValues = new FormControl('');

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.getValuesForMultiselect(this.jsonAttributeName);
  }

  ngOnChanges(): void {
    if (this.isResetted) {
      this.selectedValues.reset();
    }
  }

  getValuesForMultiselect(key: string) {
    this.values = this.securityService.getSecurityMultiselectValuesByKey(key);
  }

  /**
   * Sends selected values via eventEmitter to parent
   */
  selectValue() {
    this.multiselectEvent.emit({
      name: this.label,
      value: this.selectedValues.value,
    });
  }
}
