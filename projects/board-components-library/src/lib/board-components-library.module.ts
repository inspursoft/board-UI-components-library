import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputExDemoComponent } from './input-ex-demo/input-ex-demo.component';
import { InputExComponent } from './input-ex/input-ex.component';
import { DropdownExComponent } from './dropdown-ex/dropdown-ex.component';
import { DropdownExSelectorDirective } from './dropdown-ex/dropdown-ex-selector.directive';
import { DropdownExDemoComponent } from './dropdown-ex-demo/dropdown-ex-demo.component';
import { InputDropdownExComponent } from './input-dropdown-ex/input-dropdown-ex.component';
import { InputDropdownExDemoComponent } from './input-dropdown-ex-demo/input-dropdown-ex-demo.component';
import { InputDropdownExSelectorDirective } from './input-dropdown-ex/input-dropdown-ex-selector.directive';

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
    InputDropdownExSelectorDirective
  ],
  exports: [
    InputExComponent,
    InputExDemoComponent,
    DropdownExComponent,
    DropdownExDemoComponent,
    DropdownExSelectorDirective,
    InputDropdownExComponent,
    InputDropdownExDemoComponent,
    InputDropdownExSelectorDirective
  ]
})
export class BoardComponentsLibraryModule {
}
