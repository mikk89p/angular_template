import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service'; // our translate service

@Pipe({
  name: 'translate',
  pure: false // change it to false to get value changes at change language. Inpure makes app slower little bit
})
export class TranslatePipe implements PipeTransform {

  constructor(private _translate: TranslateService) { }

  transform(value: string, args?: any[]): any {
    if (!value) { return ''; }
    return this._translate.instant(value);
  }
}
