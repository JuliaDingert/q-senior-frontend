import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterDef } from 'src/app/models/filterDef';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent {
  @Input() filterDef: FilterDef;
  @Input() parentForm: FormGroup;
}
