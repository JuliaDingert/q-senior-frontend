import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Input() filter: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  onSearchValueAdded(eventData: any) {
    console.log(eventData);
  }
}
