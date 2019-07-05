import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputArrayExComponent } from '../input-array-ex/input-array-ex.component';

@Component({
  selector: 'lib-input-array-ex-demo',
  templateUrl: './input-array-ex-demo.component.html',
  styleUrls: ['./input-array-ex-demo.component.css']
})
export class InputArrayExDemoComponent implements OnInit {
  @ViewChildren(InputArrayExComponent) inputArrays: QueryList<InputArrayExComponent>;
  arrayValue: Array<string>;
  disabled = false;

  constructor() {
    this.arrayValue = new Array<string>();
  }

  ngOnInit() {
  }

  get values() {
    let s = '';
    this.arrayValue.forEach(value => s += `${value};`);
    return s;
  }

  setArrayValue(array: Array<string>) {
    this.arrayValue = array;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.inputArrays.first.checkSelf();
  }
}
