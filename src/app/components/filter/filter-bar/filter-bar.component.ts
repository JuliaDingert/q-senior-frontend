import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDef } from 'src/app/models/filterDef';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Input() filterDef: FilterDef[] = [];

  @Output() filterValueEvent = new EventEmitter<any>();
  @Output() resetFilterEvent = new EventEmitter<boolean>();

  public filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setFilterFormControls(this.filterDef);
  }

  /**
   * Builds form group by given filterDef
   * @param filterDef
   */
  private setFilterFormControls(filterDef: FilterDef[]): void {
    this.filterForm = this.formBuilder.group({});

    filterDef.forEach((filter) => {
      if (filter.type == 'input') {
        this.filterForm.addControl(
          filter.filterAttributeName,
          this.formBuilder.control('')
        );
      }
      if (filter.type == 'multiselect') {
        this.filterForm.addControl(
          filter.filterAttributeName,
          this.formBuilder.control('')
        );
      }
      if (filter.type == 'checkbox') {
        this.filterForm.addControl(
          filter.filterAttributeName,
          this.formBuilder.control('')
        );
      }
    });

    this.onFilterDataChanges();
  }

  /**
   * Prepares the filter data for correct processing and emits filter data to parent
   */
  private onFilterDataChanges() {
    this.filterForm.valueChanges.subscribe(() => {
      if (this.filterForm.invalid) {
        return;
      }
      let result = this.filterForm.value;

      for (let prop in result) {
        let value = result[prop];
        //If the input is empty, the filter value is set to null to ensure correct filtering.
        if (typeof value === 'string' && value.trim() === '') {
          result[prop] = null;
        }
        // We need this because after using the multiselect once, an array exists --> [] with our filter doesn't work
        if (
          typeof value === 'object' &&
          value != undefined &&
          value.length == 0
        ) {
          result[prop] = null;
        }
      }
      this.filterValueEvent.emit(result);
    });
  }

  /**
   * triggers parent to reset filter
   */
  resetFilter() {
    this.filterForm.reset();
    this.resetFilterEvent.emit(true);
    this.setFilterFormControls(this.filterDef);
  }
}
