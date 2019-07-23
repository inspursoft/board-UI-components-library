## 目的
   为了提升前端开发的工作效率和工作质量，把实际项目(Board)中的一部分前端代码抽离出来，结合实际的需求，
形成了一系列的UI组件库，供所有前端开发者共同维护；

### 来源
   我们用Angular框架开发前端项目的时候，需要用到各种个样的组件库，如Material(https://material.angular.io/)，
Clarity(https://clarity.design/)等， 这样可以简化开发流程；但这些组件库并不是结合实际的需求而产生的。
比如Clarity的下拉组件Dropdown(https://clarity.design/documentation/dropdowns)，
提供了菜单嵌套、菜单位置、触发菜单、禁用菜单、菜单分割线等功能，但它没提供如菜单模版化、准备菜单的过渡状态、设置菜单及
组件的宽度、多项选择且自定义显示选择项、搜索菜单、验证合法性等等功能，而这些需求正是我们开发中能遇到的，所以现结合Clarity的
组件库，利用Angular的组件(Component)概念，把这些需求封装起来，使开发时候更轻松，当然，目前的功能还很简单，需要大家长时间
共同的努力，相信会越来越完善的。

### 环境要求
1.X.X ---> angular7.2.0,clarity1.1.3,rxjs6.3.3

### 代码示例
 ` <lib-dropdown-ex [dropdownLabel]="'Custom item demo'"
                   [dropdownItems]="dropdownItem"
                   [dropdownMenuHeader]="'Select name'"
                   [dropdownIsRequired]="true"
                   [dropdownKey]="'name'"
                   [dropdownDisabled]="disabled"
                   [dropdownTip]="'Select name...'"
                   (dropdownChangeItem)="setActiveCustomItem($event)">
    <ng-template libItemTemp let-name="name" let-age="age">
      <div style="color: #3745ff;display: inline-block">Hello->{{name}}:{{age}}</div>
      <clr-icon shape="info-standard"></clr-icon>
    </ng-template>
    <ng-template libTitleTemp let-name="name" let-age="age">
      <div>Hello->{{name}}~~{{age}}</div>
      <clr-icon shape="info-standard"></clr-icon>
    </ng-template>
  </lib-dropdown-ex>`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
