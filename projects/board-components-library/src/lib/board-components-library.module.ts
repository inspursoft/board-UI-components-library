import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputDropdownExComponent } from './input-dropdown-ex';
import { InputDropdownExSelectorDirective } from './input-dropdown-ex';
import { InputArrayExComponent } from './input-array-ex/input-array-ex.component';
import { COMPONENTS_CUR_LANG } from './shared.types';
import { InputExComponent } from './input-ex/input-ex.component';
import { DropdownExComponent } from './dropdown-ex/dropdown-ex.component';
import { EspecialTempDirective } from './directives/especial-temp.directive';
import { TitleTempDirective } from './directives/title-temp.directive';
import { ItemTempDirective } from './directives/item-temp.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  declarations: [InputExComponent,
    DropdownExComponent,
    InputDropdownExComponent,
    InputDropdownExSelectorDirective,
    InputArrayExComponent,
    EspecialTempDirective,
    TitleTempDirective,
    ItemTempDirective
  ],
  exports: [
    InputExComponent,
    DropdownExComponent,
    InputDropdownExComponent,
    InputDropdownExSelectorDirective,
    InputArrayExComponent,
    EspecialTempDirective,
    TitleTempDirective,
    ItemTempDirective
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
