import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckSelfValid, DropdownExDisabledFn } from '../shared.types';
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
export class InputDropdownNumberComponent implements OnInit, CheckSelfValid, AfterViewInit {
  @ViewChild(InputExComponent) inputComponent: InputExComponent;
  @ViewChild('dropdownEx') dropdownEx: object;
  @Input() placeholder = '';
  @Input() isRequired = false;
  @Input() max = 0;
  @Input() min = 0;
  @Input() disabled = false;
  @Input() inUsedNumbers: Array<number>;
  @Input() label = '';
  @Input() validatorMessage: Array<{ key: string, message: string }>;
  @Input() menuHeader = '';
  @Input() tip = '';
  @Input() dropdownMinWidth = 180;
  @Input() labelWidth = 180;
  @Input() defaultActiveIndex = -1;
  @Input() activeItem: number;
  @Input() disabledFn: DropdownExDisabledFn;
  @Output() changeItem: EventEmitter<number>;
  @ContentChild(ItemTempDirective) itemTemp: ItemTempDirective;

  checkSelfAnimation: string;
  dropdownItems: Array<number>;
  curValue = '';

  constructor(private service: BoardComponentsLibraryService) {
    this.changeItem = new EventEmitter<number>();
    this.dropdownItems = new Array<number>();
    this.inUsedNumbers = new Array<number>();
    this.validatorMessage = new Array<{ key: string, message: string }>();
  }

  ngOnInit() {
    if (this.activeItem) {
      this.prepareDropdownList(`${this.activeItem}`);
    } else {
      this.prepareDropdownList('');
    }
  }

  ngAfterViewInit(): void {
    if (this.activeItem) {
      this.changeItemSelect(this.activeItem);
    }
  }

  get notSelect(): boolean {
    return this.activeItem === undefined;
  }

  get selected(): boolean {
    return this.activeItem !== undefined;
  }

  get activeText(): string {
    return this.selected ? this.activeItem.toString() : this.tip;
  }

  get isReadied(): boolean {
    return !this.disabled;
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
    const defaultMessage = this.service.isEnglishLang ? 'The number is in used' : '已经使用';
    return this.inUsedNumbers.findIndex(value => value === inputNum) > -1 ?
      {inUsed: defaultMessage} : null;
  }

  prepareDropdownList(value: string) {
    this.dropdownItems.splice(0, this.dropdownItems.length);
    for (let i = 0; i < 8; i++) {
      const startMin = this.dropdownItems.length > 0 ? this.dropdownItems[this.dropdownItems.length - 1] : this.min;
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
    return item === this.activeItem;
  }

  itemDisabled(item: number): boolean {
    if (this.disabledFn) {
      return this.disabledFn(item);
    } else {
      return false;
    }
  }

  getNextMinValidNumber(baseNumber: number, subStr: string): number {
    const result = baseNumber + 1;
    if (result < this.min || result > this.max) {
      return 0;
    }
    const strResult = `${result}`;
    if (strResult.indexOf(subStr) === -1) {
      return this.getNextMinValidNumber(baseNumber + 1, subStr);
    }
    return result;
  }

  changeItemSelect(item: number) {
    if (this.disabledFn) {
      if (!this.disabledFn(item)) {
        this.activeItem = item;
        this.curValue = `${item}`;
        this.changeItem.emit(item);
      }
    } else {
      this.activeItem = item;
      this.curValue = `${item}`;
      this.changeItem.emit(item);
    }
  }

  commitValue(value: number) {
    if (value >= this.min && value <= this.max && !this.itemDisabled(value) &&
      this.inUsedNumbers.findIndex(value1 => value1 === value) === -1) {
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
    return this.isRequired && !this.disabled ? this.inputComponent.isValid && this.selected : true;
  }
}
