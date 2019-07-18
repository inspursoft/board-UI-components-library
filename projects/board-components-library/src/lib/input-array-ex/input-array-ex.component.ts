import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckSelfValid, InputArrayExCategory, InputArrayExType } from '../shared.types';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InputExComponent } from '../input-ex/input-ex.component';

@Component({
  selector: 'lib-input-array-ex',
  templateUrl: './input-array-ex.component.html',
  styleUrls: ['./input-array-ex.component.css'],
  animations: [
    trigger('check', [
      state('begin', style({backgroundColor: '#d28f00'})),
      state('end', style({backgroundColor: 'transparent'})),
      transition('begin => end', animate(500))
    ])
  ]
})
export class InputArrayExComponent implements OnInit, AfterViewInit, CheckSelfValid {
  @Input() inputCategory: InputArrayExCategory = 'string';
  @Input() inputDisabled = false;
  @Input() inputIsRequired = false;
  @Input() inputLabel = '';
  @Input() inputPlaceholder = '';
  @Input() inputLabelWidth = '180';
  @Input() inputArrayWidth = '100%';
  @Input() inputMaxlength = 0;
  @Input() inputMinlength = 0;
  @Input() inputMax = 0;
  @Input() inputMin = 0;
  @Input() inputArrayPattern: RegExp;
  @Input() inputArrayDefault: Array<InputArrayExType>;
  @Input() inputArrayFixed: Array<InputArrayExType>;
  @ViewChild(InputExComponent) inputExComponent: InputExComponent;
  @Output() commitEvent: EventEmitter<Array<InputArrayExType>>;
  checkSelfAnimation: string;
  source: Array<InputArrayExType>;
  currentObjectValue: object;

  constructor() {
    this.commitEvent = new EventEmitter();
    this.source = new Array<InputArrayExType>();
  }

  ngOnInit() {
    if (this.inputArrayDefault) {
      this.source.unshift(...this.inputArrayDefault);
    }
    if (this.inputArrayFixed) {
      this.source.unshift(...this.inputArrayFixed);
    }
  }

  ngAfterViewInit(): void {
    if (this.source.length > 0) {
      this.commitEvent.emit(this.source);
    }
  }

  get category(): number {
    return this.inputCategory === 'string' ? 1 : 2;
  }

  isFixedItem(item: InputArrayExType): boolean {
    return this.inputArrayFixed ? this.inputArrayFixed.indexOf(item) > -1 : false;
  }

  validatorExistsFn() {
    return this.validatorExists.bind(this);
  }

  validatorExists(control: AbstractControl): ValidationErrors | null {
    if (this.source.find(value => value.toString() === control.value)) {
      return {exists: 'value exists'};
    } else {
      return null;
    }
  }

  commitValue(value: any) {
    this.currentObjectValue = {value: ''};
    this.source.push(value);
    this.commitEvent.emit(this.source);
  }

  deleteItem(index: number) {
    if (!this.inputDisabled) {
      this.source.splice(index, 1);
      this.commitEvent.emit(this.source);
    }
  }

  public checkSelf() {
    this.checkSelfAnimation = 'begin';
    setTimeout(() => this.checkSelfAnimation = 'end', 2000);
  }

  public get isValid(): boolean {
    return this.inputIsRequired && !this.inputDisabled ?
      this.inputExComponent.isValid && this.source.length > 0 : true;
  }
}
