import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputArrayExComponent } from 'board-components-library';

@Component({
  selector: 'app-input-array-ex-demo',
  templateUrl: './input-array-ex-demo.component.html',
  styleUrls: ['./input-array-ex-demo.component.css']
})
export class InputArrayExDemoComponent implements OnInit {
  @ViewChildren(InputArrayExComponent) inputArrays: QueryList<InputArrayExComponent>;
  arrayValue: Array<string>;
  arrayNumberValue: Array<number>;
  disabled = false;

  constructor() {
    this.arrayValue = new Array<string>();
    this.arrayNumberValue = new Array<number>();
  }

  ngOnInit() {
  }

  get values() {
    let s = '';
    this.arrayValue.forEach(value => s += `${value};`);
    return s;
  }

  get numberValues(){
    let s = '';
    this.arrayNumberValue.forEach(value => s += `${value.toString()};`);
    return s;
  }

  setArrayValue(array: Array<string>) {
    this.arrayValue = array;
  }

  setNumberArrayValue(array: Array<number>) {
    this.arrayNumberValue = array;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.inputArrays.first.checkSelf();
  }
}
