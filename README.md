## 目的
   为了提升前端开发的工作效率和工作质量，把实际项目(Board)中的一部分前端代码抽离出来，结合实际的需求，
形成了一系列的UI组件库，供所有前端开发者共同维护；

### 来源
   我们用Angular框架开发前端项目的时候，需要用到各种个样的组件库，如[Material](https://material.angular.io/)，
[Clarity](https://clarity.design/)等， 这样可以简化开发流程；但这些组件库并不是结合实际的需求而产生的。
比如Clarity的下拉组件[Dropdown](https://clarity.design/documentation/dropdowns)，
提供了菜单嵌套、菜单位置、触发菜单、禁用菜单、菜单分割线等功能，但它没提供如菜单模版化、准备菜单的过渡状态、设置菜单及
组件的宽度、多项选择且自定义显示选择项、搜索菜单、验证合法性等等功能，而这些需求正是我们开发中能遇到的，所以现结合Clarity的
组件库，利用Angular的组件(Component)概念，把这些需求封装起来，使开发时候更轻松，当然，目前的功能还很简单，需要大家长时间
共同的努力，相信会越来越完善的。

### 环境要求
1.X.X ---> angular7.2.0,clarity1.1.3,rxjs6.3.3

### 使用方法
工程中目前主要包括两部分：Board-components-library组件的源码和使用的Demo；在克隆后，可以执行npm install来获取对应的npm packages，
然后执行npm start，访问`http://localhost:4200/`即可看到Demo。

### 代码示例
 ```
 <lib-dropdown-ex [dropdownLabel]="'Custom item demo'"
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
   </lib-dropdown-ex>
 ```
----------------------------------------------

>### lib-input-ex
> *描述
>  >建立在[Clarity Input](https://clarity.design/documentation/input)的基础之上，利用Angular的响应式
表单的概念[ReactiveForms](https://angular.cn/guide/reactive-forms)，添加了设定异步验证、设定同步验证、
设定提示信息、默认值回写、合法性检查等功能。

> *源码
>  >[lib-input-ex](https://github.com/liyanq528/board-components-library/tree/master/projects/board-components-library/src/lib/input-array-ex)

> *Demo
>  >[Demo](https://github.com/liyanq528/board-components-library/tree/master/src/app/input-ex-demo)
