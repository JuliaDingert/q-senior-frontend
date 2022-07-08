import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss'],
})
export class MultiselectFilterComponent implements OnInit {
  @Input() label: string;
  @Output() selectedSearchValues = new EventEmitter<string[]>();

  values: string[] = [];
  selectedValues = new FormControl('');
  multiselectForm = new FormGroup({ selectedValues: this.selectedValues });

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.getValuesForMultiselect(this.label);
  }

  getValuesForMultiselect(key: string) {
    this.values = this.securityService.getGroupNames(key);
  }

  /**
   * Sends selected values via eventEmitter to parent
   */
  selectValue() {
    this.selectedSearchValues.emit(this.selectedValues.value);
  }
}
