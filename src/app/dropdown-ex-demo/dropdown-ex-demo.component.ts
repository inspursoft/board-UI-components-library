import { Component, QueryList, ViewChildren } from '@angular/core';
import { DropdownExComponent } from 'board-components-library';

@Component({
  selector: 'app-dropdown-ex-demo',
  templateUrl: './dropdown-ex-demo.component.html',
  styleUrls: ['./dropdown-ex-demo.component.css']
})
export class DropdownExDemoComponent {
  @ViewChildren(DropdownExComponent) checkSelfList: QueryList<DropdownExComponent>;
  disabled = false;
  curSelectItem: { name: string, age: number };
  curSelectCustomItem: { name: string, age: number };
  curSelectItems: Array<{ name: string, age: number }>;
  dropdownItem: Array<{ name: string, age: number }> = [
    {name: 'hello', age: 1},
    {name: 'hello world', age: 2},
    {name: '你好啊。。', age: 3},
  ];
  dropdownItemStr = ['hello', 'world'];
  curSelectItemStr = '';

  constructor() {
    this.curSelectItems = Array<{ name: string, age: number }>();
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

  setActiveItemStr(item: string) {
    this.curSelectItemStr = item;
  }

  setActiveItems(items: Array<{ name: string, age: number }>) {
    this.curSelectItems = items;
  }

  setActiveCustomItem(item: { name: string, age: number }) {
    this.curSelectCustomItem = item;
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.checkSelfList.forEach(item => item.checkSelf());
  }
}
