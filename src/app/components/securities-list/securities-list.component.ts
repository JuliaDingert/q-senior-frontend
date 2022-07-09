import { Component, OnInit, ViewChild } from '@angular/core';
import { Security } from '../../models/security';
import { BehaviorSubject, Observable } from 'rxjs';
import { indicate } from '../../utils';
import { SecurityService } from '../../services/security.service';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';
import { FilterDef } from 'src/app/models/filterDef';
import { FilterValue } from '../filter/filter-bar/filter-bar.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss'],
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'type', 'currency'];
  public securitiesFilterDef: FilterDef[] = [
    {
      label: 'Name',
      type: 'input',
      placeholder: 'Start typing...',
      filterAttributeName: 'name',
    },
    {
      label: 'Type',
      type: 'multiselect',
      filterAttributeName: 'types',
      jsonAttributeName: 'type',
    },
    {
      label: 'Currencies',
      type: 'multiselect',
      filterAttributeName: 'currencies',
      jsonAttributeName: 'currency',
    },
    { label: 'Is private', type: 'checkbox', filterAttributeName: 'isPrivate' },
  ];

  // for pagination
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public pageSizeOptions = [5, 10, 25, 50];
  public securitiesLength$: Observable<number>;

  private securitiesFilter: SecuritiesFilter = {
    skip: 0,
    limit: this.pageSizeOptions[1],
  };

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  /**
   * Fills securitiesFilter and triggers the data refresh
   * @param eventData filter data from filter bar event emitter
   */
  fillSecuritiesFilter(eventData: FilterValue) {
    if (eventData.value.length >= 1) {
      this.securitiesFilter[eventData.name] = eventData.value;
    } else {
      this.securitiesFilter[eventData.name] = undefined;
    }
    this.refreshTable();
  }

  /**
   * Resets filter
   * @param eventData
   */
  resetFilter(eventData: boolean) {
    if (eventData) {
      this.securitiesFilter = { skip: 0, limit: this.pageSizeOptions[1] };
    }
    this.refreshTable();
  }

  /**
   * Refreshes the table data
   */
  refreshTable() {
    this.securities$ = this.securityService
      .getSecurities(this.securitiesFilter)
      .pipe(indicate(this.loadingSecurities$));

    this.securitiesLength$ = this.securityService.getSecuritiesLength(
      this.securitiesFilter
    );
  }

  /**
   * Shows correct data by current paginator
   * @param e
   */
  onPageChanged(e: PageEvent) {
    this.securitiesFilter = {
      ...this.securitiesFilter,
      skip: e.pageIndex * e.pageSize,
      limit: e.pageIndex * e.pageSize + e.pageSize,
    };
    this.refreshTable();
  }
}
