import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterDef } from 'src/app/models/filterDef';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent {
  @Input() filterDef: FilterDef;
  @Input() parentForm: FormGroup;
}
