import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  transform(value: number, decimalPlaces: number = 0): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convierte el número a string y formatea con separador de miles
    const numberString = value.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return numberString;
  }

}

