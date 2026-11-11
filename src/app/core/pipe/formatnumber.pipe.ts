import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { VariablesIniciales } from '../../constant';
import { isNullOrUndefined } from '../../util/utils';


@Pipe({
  name: 'formatnumber',
  standalone: true,
})
export class FormatnumberPipe implements PipeTransform {
  constructor(private readonly decimalPipe: DecimalPipe) {}

  transform(value: any, ...args: string[]): string | null {
    const format = '.2-2';
    if (isNullOrUndefined(value) || value === Number(0)) {
      return VariablesIniciales.MONTO;
    }
    return this.decimalPipe.transform(value, format);
  }
}
