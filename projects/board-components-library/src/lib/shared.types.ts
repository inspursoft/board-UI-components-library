export interface CheckSelfValid {
  checkSelf();
}
export const DROPDOWN_EX_DEFAULT_SHOW_COUNT = 20;
export type DropdownExModel = 'single' | 'multiple';
export type DropdownExDisabledFn = (item: any) => boolean;
export type DropdownExSelectEnableFn = (item: any) => boolean;
export enum InputExCategory {
  iecString = 1, iecNumber, iecPassword, iecEmail
}

export enum InputExType {
  ietNormal = 1, ietClick, ietNoLabel
}

export enum InputExStatus {
  iesEdit = 1, iesView
}
