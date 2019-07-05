import { Inject, Injectable, Optional } from '@angular/core';
import { CUR_LANG } from './shared.types';

@Injectable({
  providedIn: 'root'
})
export class BoardComponentsLibraryService {

  constructor(@Optional()
              @Inject(CUR_LANG)
              private curLang: string) {
  }

  get isEnglishLang(): boolean {
    return this.curLang && this.curLang === 'en';
  }
}
