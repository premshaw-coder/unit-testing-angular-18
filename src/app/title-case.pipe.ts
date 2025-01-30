import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})
export class TitleCasePipe implements PipeTransform {
  /**
   * The function transforms a string by converting the first letter of each word to uppercase and the
   * rest to lowercase.
   * @param {string} value - A string value that you want to transform by capitalizing the first letter
   * of each word and converting the rest of the letters to lowercase.
   * @returns The `transform` function takes a string as input, converts it to lowercase, capitalizes
   * the first letter of each word, and then returns the transformed string.
   */
  transform(value: string): string {
    if (!value) return ''; // Or handle null/undefined as needed
    else if (!isNaN(+value)) return value;
    return value.toLowerCase().split(' ').map(word => {
      console.log('prem', word);
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
}