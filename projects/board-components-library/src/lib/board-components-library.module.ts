import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { InputExComponent } from './input-ex/input-ex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputExDemoComponent } from './input-ex-demo/input-ex-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  declarations: [InputExComponent, InputExDemoComponent],
  exports: [InputExComponent, InputExDemoComponent]
})
export class BoardComponentsLibraryModule {
}
