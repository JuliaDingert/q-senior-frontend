import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnInit {
  @Input() label: string;
  @Output() clickedCheckbox = new EventEmitter<boolean>();
  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Sends checkbox state via eventEmitter to parent
   * @param value current checkbox state
   */
  clickCheckbox(value) {
    this.checked = value;
    this.clickedCheckbox.emit(this.checked);
  }
}
