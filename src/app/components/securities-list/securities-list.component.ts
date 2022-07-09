import { Component, OnInit } from '@angular/core';
import { Security } from '../../models/security';
import { BehaviorSubject, Observable } from 'rxjs';
import { indicate } from '../../utils';
import { SecurityService } from '../../services/security.service';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';
import { FilterDef } from 'src/app/models/filterDef';
import { FilterValue } from '../filter/filter-bar/filter-bar.component';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss'],
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'type', 'currency'];

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private securitiesFilter: SecuritiesFilter = {};

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
      this.securitiesFilter = {};
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
  }
}
