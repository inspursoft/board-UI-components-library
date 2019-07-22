import { Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckSelfValid, DropdownExDisabledFn, DropdownExSelectEnableFn } from '../shared.types';
import { ItemTempDirective } from '../directives/item-temp.directive';
import { IfOpenService } from '@clr/angular/utils/conditional/if-open.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InputExComponent } from '../input-ex/input-ex.component';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BoardComponentsLibraryService } from '../board-components-library.service';

@Component({
  selector: 'lib-input-dropdown-number',
  templateUrl: './input-dropdown-number.component.html',
  styleUrls: ['./input-dropdown-number.component.css'],
  animations: [
    trigger('check', [
      state('begin', style({backgroundColor: '#d28f00'})),
      state('end', style({backgroundColor: 'transparent'})),
      transition('begin => end', animate(500))
    ])
  ]
})
export class InputDropdownNumberComponent implements OnInit, CheckSelfValid {
  @ViewChild(InputExComponent) inputComponent: InputExComponent;
  @ViewChild('dropdownEx') dropdownEx: object;
  @Input() inputPlaceholder = '';
  @Input() inputDropdownIsRequired = false;
  @Input() inputMax = 0;
  @Input() inputMin = 0;
  @Input() inputConflictNumbers: Array<number>;
  @Input() inputDropdownDisabled = false;
  @Input() inputDropdownLabel = '';
  @Input() inputDropdownLabelWidth = 180;
  @Input() validatorMessage: Array<{ key: string, message: string }>;
  @Input() dropdownMenuHeader = '';
  @Input() dropdownTip = '';
  @Input() dropdownMinWidth = 180;
  @Input() dropdownDefaultActiveIndex = -1;
  @Input() dropdownItemDisabledFn: DropdownExDisabledFn;
  @Output() dropdownChangeItem: EventEmitter<number>;
  @ContentChild(ItemTempDirective) itemTemp: ItemTempDirective;

  checkSelfAnimation: string;
  dropdownActiveItem: number;
  dropdownItems: Array<number>;
  curValue = '';

  constructor(private service: BoardComponentsLibraryService) {
    this.dropdownChangeItem = new EventEmitter<number>();
    this.dropdownItems = new Array<number>();
    this.inputConflictNumbers = new Array<number>();
    this.validatorMessage = new Array<{ key: string, message: string }>();
  }

  ngOnInit() {
    this.prepareDropdownList('');
  }

  get notSelect(): boolean {
    return this.dropdownActiveItem === undefined;
  }

  get selected(): boolean {
    return this.dropdownActiveItem !== undefined;
  }

  get activeText(): string {
    return this.selected ? this.dropdownActiveItem.toString() : this.dropdownTip;
  }

  get isReadied(): boolean {
    return !this.inputDropdownDisabled;
  }

  get isCustomTemplate(): boolean {
    return this.itemTemp !== undefined;
  }

  get isDefaultTemplate(): boolean {
    return this.itemTemp === undefined;
  }

  get isEmptyList(): boolean {
    return this.dropdownItems !== undefined && this.dropdownItems.length === 0;
  }

  get inputWidth(): string {
    return `${this.dropdownMinWidth}px`;
  }

  get validInputFunBind() {
    return this.validInputFun.bind(this);
  }

  validInputFun(control: AbstractControl): ValidationErrors | null {
    const inputNum = Number(control.value);
    const defaultMessage = this.service.isEnglishLang ? 'Conflict number' : '冲突数字';
    return this.inputConflictNumbers.findIndex(value => value === inputNum) > -1 ?
      {conflictNumber: defaultMessage} : null;
  }

  prepareDropdownList(value: string) {
    this.dropdownItems.splice(0, this.dropdownItems.length);
    for (let i = 0; i < 8; i++) {
      const startMin = this.dropdownItems.length > 0 ? this.dropdownItems[this.dropdownItems.length - 1] : this.inputMin;
      const validValue = this.getNextMinValidNumber(startMin, value);
      if (validValue > 0) {
        this.dropdownItems.push(validValue);
      }
    }
  }

  validNumberStart(validNumber: number): string {
    const validNumberStr = `${validNumber}`;
    const index = validNumberStr.indexOf(this.curValue);
    return validNumberStr.slice(0, index);
  }

  validNumberEnd(validNumber: number): string {
    const validNumberStr = `${validNumber}`;
    const index = validNumberStr.indexOf(this.curValue) + this.curValue.length;
    return validNumberStr.slice(index);
  }

  itemActive(item: number): boolean {
    return item === this.dropdownActiveItem;
  }

  itemDisabled(item: number): boolean {
    if (this.dropdownItemDisabledFn) {
      return this.dropdownItemDisabledFn(item);
    } else {
      return false;
    }
  }

  getNextMinValidNumber(baseNumber: number, subStr: string): number {
    const result = baseNumber + 1;
    if (result < this.inputMin || result > this.inputMax) {
      return 0;
    }
    const strResult = `${result}`;
    if (strResult.indexOf(subStr) === -1) {
      return this.getNextMinValidNumber(baseNumber + 1, subStr);
    }
    return result;
  }

  changeItemSelect(item: number) {
    if (this.dropdownItemDisabledFn && !this.dropdownItemDisabledFn(item)) {
      this.dropdownActiveItem = item;
      console.log(this.dropdownActiveItem);
      this.curValue = `${item}`;
      this.dropdownChangeItem.emit(item);
    } else {
      this.dropdownActiveItem = item;
      this.curValue = `${item}`;
      this.dropdownChangeItem.emit(item);
    }
  }

  commitValue(value: number) {
    if (value >= this.inputMin &&
      value <= this.inputMax &&
      !this.dropdownItemDisabledFn(value) &&
      this.inputConflictNumbers.findIndex(value1 => value1 === value) === -1) {
      this.changeItemSelect(value);
    }
  }

  valueChanges(value: number) {
    this.curValue = `${value}`;
    if (this.dropdownEx && Reflect.has(this.dropdownEx, 'ifOpenService')) {
      const openService = Reflect.get(this.dropdownEx, 'ifOpenService') as IfOpenService;
      openService.open = true;
    }
    this.prepareDropdownList(this.curValue);
  }

  public checkSelf() {
    this.checkSelfAnimation = 'begin';
    setTimeout(() => this.checkSelfAnimation = 'end', 2000);
  }

  public get isValid(): boolean {
    return this.inputDropdownIsRequired && !this.inputDropdownDisabled ?
      this.inputComponent.isValid && this.selected : true;
  }
}
