import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkStrength',
  standalone: true
})
export class CheckStrengthPipe implements PipeTransform {
/**
 * The function takes a number as input and returns a string indicating its strength level based on
 * certain conditions.
 * @param {number} value - The `transform` function takes a number as input and returns a string based
 * on the value of the input number. If the input number is less than 10, it appends '(weak)' to the
 * number. If the input number is between 10 and 19 (inclusive), it appends
 * @returns The `transform` function returns a string based on the value provided. If the value is less
 * than 10, it appends '(weak)' to the value. If the value is between 10 and 19 (inclusive), it appends
 * '(strong)' to the value. Otherwise, it appends '(strongest)' to the value.
 */
  transform(value: number): string {
    if (value < 10) return value + '(weak)'
    else if (value >= 10 && value < 20) return value + '(strong)'
    else return value + '(strongest)'
  }

}
