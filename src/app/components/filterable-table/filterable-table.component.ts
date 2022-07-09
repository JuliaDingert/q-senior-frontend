import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Observable } from 'rxjs';
import { FilterDef } from 'src/app/models/filterDef';
import { FilterValue } from '../filter/filter-bar/filter-bar.component';

@Component({
  selector: 'filterable-table',
  templateUrl: './filterable-table.component.html',
  styleUrls: ['./filterable-table.component.scss'],
})
export class FilterableTableComponent<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() columns: string[];
  @Input() filterDef: FilterDef[];

  @Input() dataSource: readonly T[] | DataSource<T> | Observable<readonly T[]>;
  @Input() isLoading: boolean;

  @Output() filterValueEvent = new EventEmitter<FilterValue>();
  @Output() resetFilterEvent = new EventEmitter<boolean>();

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach((rowDef) => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach((headerRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
    this.table.setNoDataRow(this.noDataRow);
  }

  /**
   * Get filter values from children and sends values via event emitter to parent
   * @param event
   */
  getValues(event) {
    this.filterValueEvent.emit(event);
  }

  /**
   * Triggers parent to reset filter
   * @param event
   */
  resetFilter(event) {
    this.resetFilterEvent.emit(event);
  }
}
