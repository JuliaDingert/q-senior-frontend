import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  /**
   * Groups an array by a key
   * @param array
   * @param key
   * @returns map of array grouped by a key
   */
  groupBy<T, K extends keyof T>(array: T[], key: K) {
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
  getGroupNames(data: Array<any>, key): string[] {
    let groupNames: string[] = [];
    groupNames.push(...this.groupBy(data, key).keys());

    return groupNames;
  }
}
