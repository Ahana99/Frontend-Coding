/**
 * Create a custom Angular pipe searchFilter that filters an array of objects by a searchTerm. The pipe should work case-insensitively on the title property.

    Expected:
    - Input: [ {title:'Angular'}, {title:'React'}, {title:'Vue'} ], searchTerm = 'an'
    - Output: [ {title:'Angular'} ]
 */

/**
 ******************* search-filter.pipe.ts *******************
*/import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  transform(items: { title: string }[], searchTerm: string): { title: string }[] {
    if(!items || !searchTerm) return items;

    const lowerTerm = searchTerm.toLowerCase();
    return items.filter(item => item.title.toLowerCase().includes(lowerTerm));
}
