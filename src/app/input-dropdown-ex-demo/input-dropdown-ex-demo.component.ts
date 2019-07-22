import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputDropdownNumberComponent } from 'board-components-library';

@Component({
  selector: 'app-input-dropdown-ex-demo',
  templateUrl: './input-dropdown-ex-demo.component.html',
  styleUrls: ['./input-dropdown-ex-demo.component.css']
})
export class InputDropdownExDemoComponent implements OnInit {
  @ViewChildren(InputDropdownNumberComponent) checkSelfList: QueryList<InputDropdownNumberComponent>;
  disabled = false;
  curAge: number;

  constructor() {
  }

  ngOnInit() {
  }

  dropdownDisabledFn() {
    return this.dropdownDisabled.bind(this);
  }

  dropdownDisabled(age: number): boolean {
    return age === 123;
  }

  setActiveItem(age: number ) {
    this.curAge = age;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.checkSelfList.forEach(item => item.checkSelf());
  }
}
