import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements OnInit {
  @Input() placeholder: string;
  @Input() label: string;
  @Output() enteredSearchValue = new EventEmitter<string>();

  value: string = '';

  constructor() {}

  ngOnInit(): void {}

  sendSearchValue(): void {
    this.enteredSearchValue.emit(this.value);
  }
}
