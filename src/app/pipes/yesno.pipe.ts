import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'yesOrNo'})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    if(value === undefined) return "n/a";
    if(value === true) return "Igen";
    else return "Nem";
  }
}
