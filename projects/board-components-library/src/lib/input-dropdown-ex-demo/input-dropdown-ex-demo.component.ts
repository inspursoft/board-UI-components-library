import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputDropdownExComponent } from '../input-dropdown-ex/input-dropdown-ex.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-input-dropdown-ex-demo',
  templateUrl: './input-dropdown-ex-demo.component.html',
  styleUrls: ['./input-dropdown-ex-demo.component.css']
})
export class InputDropdownExDemoComponent implements OnInit {
  @ViewChildren(InputDropdownExComponent) checkSelfList: QueryList<InputDropdownExComponent>;
  disabled = false;
  curSelectItem: { name: string, age: number };
  curAsyncSelectItem: { name: string, age: number };
  curCustomAsyncSelectItem: { name: string, age: number };
  dropdownItems: Array<{ name: string, age: number }> = [
    {name: 'hello', age: 1},
    {name: 'hello world', age: 2}
  ];
  dropdownAsyncItems: Array<{ name: string, age: number }> = [
    {name: 'hello', age: 1},
    {name: 'hello world', age: 2}
  ];
  dropdownCustomAsyncItems: Array<{ name: string, age: number }> = [
    {name: 'hello custom', age: 1},
    {name: 'hello world custom', age: 2}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  dropdownDisabledFn() {
    return this.dropdownDisabled.bind(this);
  }

  dropdownDisabled(item: { name: string, age: number }): boolean {
    return item.name === 'hello';
  }

  setActiveItem(item: { name: string, age: number }) {
    this.curSelectItem = item;
  }

  setAsyncActiveItem(item: { name: string, age: number }) {
    this.curAsyncSelectItem = item;
  }

  setCustomAsyncActiveItem(item: { name: string, age: number }) {
    this.curCustomAsyncSelectItem = item;
  }

  refreshItems(serchText: string) {
    setTimeout(() => {
      this.dropdownAsyncItems = this.dropdownItems.filter(
        (value: { name: string, age: number }) => value.name.includes(serchText));
    }, 300);
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.checkSelfList.forEach(item => item.checkSelf());
  }
}
