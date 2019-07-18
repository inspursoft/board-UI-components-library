import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
/*en: english, zh: chinese*/
export const COMPONENTS_CUR_LANG = new InjectionToken('curLang');

export interface CheckSelfValid {
  isValid: boolean;

  checkSelf();
}

export const DROPDOWN_EX_DEFAULT_SHOW_COUNT = 15;
export type DropdownExModel = 'single' | 'multiple';
export type DropdownExDisabledFn = (item: any) => boolean;
export type DropdownExSelectEnableFn = (item: any) => Observable<boolean>;
export type InputDropdownExModel = 'sync' | 'async';
export type InputArrayExCategory = 'string' | 'number';
export type InputArrayExType = string | number;

export enum InputExCategory {
  iecString = 1, iecNumber, iecPassword, iecEmail
}

export enum InputExType {
  ietNormal = 1, ietClick
}

export enum InputExStatus {
  iesEdit = 1, iesView
}
