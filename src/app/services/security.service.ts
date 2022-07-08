import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Security } from '../models/security';
import { SECURITIES } from '../mocks/securities-mock';
import { SecuritiesFilter } from '../models/securitiesFilter';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor() {}

  /**
   * Get Securities server request mock
   * @param securityFilter
   * @returns list of securities
   */
  getSecurities(securityFilter?: SecuritiesFilter): Observable<Security[]> {
    const filteredSecurities = this.filterSecurities(securityFilter).slice(
      securityFilter?.skip ?? 0,
      securityFilter?.limit ?? 100
    );

    return of(filteredSecurities).pipe(delay(1000));
  }

  /**
   * Filters securities
   * @param securityFilter
   * @returns filtred securities
   */
  private filterSecurities(securityFilter: SecuritiesFilter) {
    if (!securityFilter) return SECURITIES;

    return SECURITIES.filter(
      (s) =>
        (!securityFilter.name || s.name.includes(securityFilter.name)) &&
        (!securityFilter.types ||
          securityFilter.types.some((type) => s.type === type)) &&
        (!securityFilter.currencies ||
          securityFilter.currencies.some(
            (currency) => s.currency == currency
          )) &&
        (securityFilter.isPrivate === undefined ||
          securityFilter.isPrivate === s.isPrivate)
    );
  }

  /**
   * Groups an array by a key
   * @param array
   * @param key
   * @returns map of array grouped by a key
   */
  private groupBy<T, K extends keyof T>(array: T[], key: K) {
    let map = new Map<T[K], T[]>();
    array.forEach((item) => {
      let itemKey = item[key];
      if (!map.has(itemKey)) {
        map.set(
          itemKey,
          array.filter((i) => i[key] === item[key])
        );
      }
    });
    return map;
  }

  /**
   * Get group names for multiselect values
   * @param key Key by which the data is to be grouped
   * @returns list of group names
   */
  getGroupNames(key): string[] {
    let groupNames: string[] = [];
    groupNames.push(...this.groupBy(SECURITIES, key).keys());

    return groupNames;
  }
}
