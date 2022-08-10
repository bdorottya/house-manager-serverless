import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'yesOrNo'})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    if(value === false) return "Nem";
    if(value === true) return "Igen";
    else return "n/a";
  }
}
