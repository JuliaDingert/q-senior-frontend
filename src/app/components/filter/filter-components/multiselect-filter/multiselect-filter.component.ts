import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { FilterValue } from '../../filter-bar/filter-bar.component';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
})
export class MultiselectFilterComponent implements OnInit {
  @Input() label: string = '';
  @Input() jsonAttributeName: string = '';
  @Output() selectedSearchValues = new EventEmitter<FilterValue>();

  values: string[] = [];
  selectedValues = new FormControl('');

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.getValuesForMultiselect(this.jsonAttributeName);
  }

  getValuesForMultiselect(key: string) {
    this.values = this.securityService.getSecurityMultiselectValuesByKey(key);
  }

  /**
   * Sends selected values via eventEmitter to parent
   */
  selectValue() {
    this.selectedSearchValues.emit({
      name: this.label,
      value: this.selectedValues.value,
    });
  }
}
