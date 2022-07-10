import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Security } from '../models/security';
import { SECURITIES } from '../mocks/securities-mock';
import { SecuritiesFilter } from '../models/securitiesFilter';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private generalService: GeneralService) {}

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
        (securityFilter.isPrivate == undefined ||
          securityFilter.isPrivate === s.isPrivate)
    );
  }

  /**
   * Get securities multiselect values by given key
   * @param key
   * @returns multiselect values
   */
  getSecurityMultiselectValuesByKey(key: string): string[] {
    return this.generalService.getGroupNames(SECURITIES, key);
  }

  /**
   * Get length of securities list by given filter
   * @param securityFilter
   * @returns length
   */
  getSecuritiesLength(securityFilter?: SecuritiesFilter): Observable<number> {
    const filteredSecurities = this.filterSecurities(securityFilter);

    return of(filteredSecurities.length).pipe(delay(1000));
  }
}
