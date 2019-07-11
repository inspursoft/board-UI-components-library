import { Inject, Injectable, Optional } from '@angular/core';
import { COMPONENTS_CUR_LANG } from './shared.types';

@Injectable({
  providedIn: 'root'
})
export class BoardComponentsLibraryService {

  constructor(@Optional()
              @Inject(COMPONENTS_CUR_LANG)
              private curLang: string) {
  }

  get isEnglishLang(): boolean {
    return this.curLang && this.curLang === 'en';
  }
}
