import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterDef } from 'src/app/models/filterDef';
import { SecurityService } from 'src/app/services/security.service';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
})
export class MultiselectFilterComponent implements OnInit, OnChanges {
  @Input() filterDef: FilterDef;
  @Input() isResetted: boolean;
  @Output() multiselectEvent = new EventEmitter<FilterValue>();

  values: string[] = [];
  selectedValues = new FormControl('');

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.getValuesForMultiselect(this.filterDef.jsonAttributeName);
  }

  ngOnChanges(): void {
    if (this.isResetted) {
      this.selectedValues.reset();
    }
  }

  /**
   * Get values for multiselect by given key
   * @param key
   */
  getValuesForMultiselect(key: string) {
    this.values = this.securityService.getSecurityMultiselectValuesByKey(key);
  }

  /**
   * Sends selected values via eventEmitter to parent
   */
  selectValue() {
    this.multiselectEvent.emit({
      name: this.filterDef.filterAttributeName,
      value: this.selectedValues.value,
    });
  }
}
