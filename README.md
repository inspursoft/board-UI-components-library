## 目的
   为了提升前端开发的工作效率和工作质量，把实际项目(Board)中的一部分前端代码抽离出来，结合实际的需求，
形成了一系列的UI组件库，供所有前端开发者共同维护；

## 浏览器支持

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |


### 来源
   我们用Angular框架开发前端项目的时候，需要用到各种个样的组件库，如[Material](https://material.angular.io/)，
[Clarity](https://clarity.design/)等， 这样可以简化开发流程；但这些组件库并不是结合实际的需求而产生的。
比如Clarity的下拉组件[Dropdown](https://clarity.design/documentation/dropdowns)，
提供了菜单嵌套、菜单位置、触发菜单、禁用菜单、菜单分割线等功能，但它没提供如菜单模版化、准备菜单的过渡状态、设置菜单及
组件的宽度、多项选择且自定义显示选择项、搜索菜单、验证合法性等等功能，而这些需求正是我们开发中能遇到的，所以现结合Clarity的
组件库，利用Angular的组件(Component)概念，把这些需求封装起来，使开发时候更轻松，当然，目前的功能还很简单，需要大家长时间
共同的努力，相信会越来越完善的。

### 特点

1. 全部模版化，ts代码量少。HTML中以标签的形式存在；
2. 使用灵活，目前存在3中提供指定自定义模版的指令，供用户使用，以后还会完善。
3. ...

### 环境要求
1.X.X ---> angular7.2.0,clarity1.1.3,rxjs6.3.3

### 使用方法
工程中目前主要包括两部分：Board-components-library组件的源码和使用的Demo；在克隆后，可以执行npm install来获取对应的npm packages，
然后执行npm start，访问`http://localhost:4200/`即可看到Demo。
1. 在Angular工程下安装board-components-library
`npm install board-components-library`
2. 在app.module中，imports导入，en代表了使用英语提示，不写forRoot表示用中文提示。
`BoardComponentsLibraryModule.forRoot('en')`
3. 可以在HTML模版中使用Board-components-library提供的标签，如下代码所示。

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

### InputExComponent

##### 说明
建立在[Clarity Input](https://clarity.design/documentation/input)的基础之上，利用Angular的响应式
表单的概念[ReactiveForms](https://angular.cn/guide/reactive-forms)，添加了设定异步验证、设定同步验证、
设定提示信息、默认值回写、合法性检查等功能。[源码](https://github.com/liyanq528/board-components-library/tree/master/projects/board-components-library/src/lib/input-array-ex);
[Demo](https://github.com/liyanq528/board-components-library/tree/master/src/app/input-ex-demo)

##### api

名称 | 说明 | 输入(输出) | 默认值
------- | ----------- | --------- | ---------
inputIsRequired | 是否为必要输入 | 输入 | false
inputCategory | 输入的类别：字符串、数字、密码、邮件 | 输入 | 字符串
inputLabelWidth | 标签的宽度(单位:px) | 输入 | 180
inputWidth | 整体宽度 | 输入 | '100%'
inputType | 输入框类型:输入框、只能触发Click | 输入 | 输入框
inputPattern | 验证输入的正则串 | 输入 | undefined
... | ... | ... | ...
sourcePassword | 是否为密码框,主要为了和确认密码框相互验证 | 输入 | false
verifyPassword | 是否为验证密码框,主要为了和密码框相互验证 | 输入 | false
validatorFns | 同步验证合法性的函数数组 | 输入 | undefined
validatorAsyncFn | 异步验证函数 | 输入 | undefined
validatorMessage | 非法时的提示信息数组 | 输入 | []
inputUpdateOn | 输入框更新策略:'change'、'blur'、'submit' | 输入 | blur
editEvent | 输入框进入编辑状态触发 | 输出 | EventEmitter<any>实例
revertEvent | 返回上一个正确值触发 | 输出 | EventEmitter<any>实例
commitEvent | 提交一个合法值触发 | 输出 | EventEmitter<any>实例
valueChanges | 在输入值改变时触发 | 输出 | EventEmitter<any>实例

### DropdownExComponent

##### 说明
建立在[Clarity dropdowns](https://clarity.design/documentation/dropdowns)的基础之上，利用Angular模版容器
ng-container的优势，扩展了许多能自定义的视图，如菜单模版化、准备菜单的过渡状态、设置菜单及组件的宽度、多项选择且自定义显
示选择项、搜索菜单、验证合法性等等功能；[源码](https://github.com/liyanq528/board-components-library/tree/master/projects/board-components-library/src/lib/dropdown-ex);
[Demo](https://github.com/liyanq528/board-components-library/tree/master/src/app/dropdown-ex-demo)

##### api

名称 | 说明 | 输入(输出) | 默认值
------- | ----------- | --------- | ---------
dropdownItems | 下拉的菜单数组 | 输入 | undefined
dropdownItemDisabledFn | 是否禁用的同步回调函数 | 输入 | undefined
dropdownItemSelectEnableFn | 是否能选择的异步回调函数 | 输入 | undefined
dropdownDisabled | 下拉框是否禁用 | 输入 | undefined
dropdownTip | 未选择时的提示信息,如:'请选择...' | 输入 | ''
dropdownKey | 如果列表数组元素是对象类型(常见),设置显示出来的字段名字 | 输入 | ''
dropdownIsRequired | 是否必须选择 | 输入 | false
... | ... | ... | ...
dropdownModel | 单项选择或者多项选择: 'single'、'multiple' | 输入 | 'single'
dropdownEspecialItem | 在所有列表的上面增加了一个特殊的选项，例如选择项目时，给出项目列表后，利用这个特殊选项可以处理添加项目的需求 | 输入 | undefined
dropdownActiveItems | 设置多项选择时，没选择时的默认值或者同步选择数据 | 输入 | undefined
dropdownActiveItem | 设置但项选择时，没选择时的默认值或者同步选择数据 | 输入 | undefined
dropdownDefaultActiveIndex | 设定一个默认选择的Index | 输入 | undefined
dropdpwnPosition | 下拉菜单的位置 | 输入 | 'bottom-left'
dropdownChangeItem | 选择下拉菜单时触发 | 输出 | EventEmitter<any>实例
dropdownEspecialClick | 点击特殊菜单时触发 | 输出 | EventEmitter<any>实例
especialTemp | 特殊选项的模版选择指令 | 输入 | undefined
itemTemp | 菜单的模版选择指令 | 输入 | undefined
titleTemp | 显示框的模版选择指令 | 输入 | undefined

### InputArrayExComponent

##### 说明
解决了多个输入的需求问题，例如需要设定容器端口时，可以不输入、输入1个或者多个。目前组件做的比较简单，利用InputExComponent的特点做了
简单的封装，随时会添加新功能，只是暂时没有遇到特别的需求。[源码](https://github.com/liyanq528/board-components-library/tree/master/projects/board-components-library/src/lib/input-array-ex);
[Demo](https://github.com/liyanq528/board-components-library/tree/master/src/app/input-array-ex-demo)

##### api

名称 | 说明 | 输入(输出) | 默认值
------- | ----------- | --------- | ---------
inputCategory | 输入的类别：字符串、数字 | 输入 | 'string'
inputIsRequired | 是否必须至少有一个值 | 输入 | false
inputDisabled | 是否禁用 | 输入 | false
... | ... | ... | ...
inputArrayDefault | 设定默认值数组 | 输入 | false
inputArrayFixed | 设定固定值数组，解决只是显示，但不能移除的数据 | 输入 | undefined
commitEvent | 提交一个合法值时触发 | 输出 | EventEmitter实例

### InputDropdownNumberComponent

##### 说明
由于这个组件同时处理字符串输入和数字输入时，有些难度，所以为了简单起见，目前只做了支持数字输入的组件InputDropdownNumberComponent。
在InputExComponent与DropdownExComponent下拉框部分进行了封装，目的为了输入时动态显示合法的下拉框，并从中选出合适的选项。
这个组件目前也是做的比较简单，只是在Board项目中使用了一次，诸如异步验证、多项选择等等稍复杂的功能都没有添加，等以后
有需求时，再做修改；[源码](https://github.com/liyanq528/board-components-library/tree/master/projects/board-components-library/src/lib/input-dropdown-number);
[Demo](https://github.com/liyanq528/board-components-library/tree/master/src/app/input-dropdown-number)

##### api

名称 | 说明 | 输入(输出) | 默认值
------- | ----------- | --------- | ---------
... | ... | ... | ...
inUsedNumbers | 已经使用的数字数组 | 输入 | Array实例
validatorMessage | 输入不合法时的提示信息数组 | 输入 | Array实例
defaultActiveIndex | 默认的值的Index | 输入 | -1
activeItem | 可以做为默认值来设置 | 输入 | undefined
disabledFn | 设置选项是否为禁用的回调函数，同步的 | 输入 | undefined
changeItem | 选择一个选项时候触发 | 输出 | EventEmitter实例



