import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckSelfValid, InputArrayExType } from '../shared.types';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
export class InputArrayExComponent implements OnInit, CheckSelfValid {
  @Input() inputCategory: InputArrayExType = 'string';
  @Input() inputDisabled = false;
  @Input() inputIsRequired = false;
  @Input() inputLabel = '';
  @Input() inputPlaceholder = '';
  @Input() inputLabelMinWidth = '180';
  @Output() commitEvent: EventEmitter<Array<InputArrayExType>>;
  checkSelfAnimation: string;
  source: Array<InputArrayExType>;
  currentObjectValue: object;

  constructor() {
    this.commitEvent = new EventEmitter();
    this.source = new Array<InputArrayExType>();
  }

  ngOnInit() {
  }

  get category(): number {
    return this.inputCategory === 'string' ? 1 : 2;
  }

  validatorExistsFn() {
    return this.validatorExists.bind(this);
  }

  validatorExists(control: AbstractControl): ValidationErrors | null {
    if (this.source.find(value => value === control.value)) {
      return {exists: 'value exists'};
    } else {
      return null;
    }
  }

  commitValue(value: any) {
    if (value !== '') {
      this.currentObjectValue = {value: ''};
      this.source.push(value);
      this.commitEvent.emit(this.source);
    }
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
    return this.inputIsRequired && !this.inputDisabled ? this.source.length > 0 : true;
  }
}
