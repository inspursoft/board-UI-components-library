import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputExDemoComponent } from './input-ex-demo/input-ex-demo.component';
import { InputExComponent } from './input-ex/input-ex.component';
import { DropdownExSelectorDirective } from './dropdown-ex';
import { DropdownExDemoComponent } from './dropdown-ex-demo/dropdown-ex-demo.component';
import { InputDropdownExComponent } from './input-dropdown-ex';
import { InputDropdownExDemoComponent } from './input-dropdown-ex-demo/input-dropdown-ex-demo.component';
import { InputDropdownExSelectorDirective } from './input-dropdown-ex';
import { InputArrayExComponent } from './input-array-ex/input-array-ex.component';
import { InputArrayExDemoComponent } from './input-array-ex-demo/input-array-ex-demo.component';
import { COMPONENTS_CUR_LANG } from './shared.types';
import { DropdownExComponent } from './dropdown-ex';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  declarations: [
    InputExComponent,
    InputExDemoComponent,
    DropdownExComponent,
    DropdownExSelectorDirective,
    DropdownExDemoComponent,
    InputDropdownExComponent,
    InputDropdownExDemoComponent,
    InputDropdownExSelectorDirective,
    InputArrayExComponent,
    InputArrayExDemoComponent
  ],
  exports: [
    InputExComponent,
    InputExDemoComponent,
    DropdownExComponent,
    DropdownExDemoComponent,
    DropdownExSelectorDirective,
    InputDropdownExComponent,
    InputDropdownExDemoComponent,
    InputDropdownExSelectorDirective,
    InputArrayExComponent,
    InputArrayExDemoComponent
  ]
})
export class BoardComponentsLibraryModule {
  static forRoot(curLang: string): ModuleWithProviders {
    return {
      ngModule: BoardComponentsLibraryModule,
      providers: [{provide: COMPONENTS_CUR_LANG, useValue: curLang}]
    };
  }
}
