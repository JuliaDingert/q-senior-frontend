import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterDef } from 'src/app/models/filterDef';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
})
export class MultiselectFilterComponent implements OnInit {
  @Input() filterDef: FilterDef;
  @Input() parentForm: FormGroup;

  multiSelectValues: string[] = [];

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.getValuesForMultiSelect(this.filterDef.jsonAttributeName);
  }

  /**
   * Get values for multiselect by given key
   * @param key
   */
  getValuesForMultiSelect(key: string) {
    this.multiSelectValues =
      this.securityService.getSecurityMultiselectValuesByKey(key);
  }
}
