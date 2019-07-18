import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { DropdownExDemoComponent } from './dropdown-ex-demo/dropdown-ex-demo.component';
import { InputArrayExDemoComponent } from './input-array-ex-demo/input-array-ex-demo.component';
import { InputDropdownExDemoComponent } from './input-dropdown-ex-demo/input-dropdown-ex-demo.component';
import { InputExDemoComponent } from './input-ex-demo/input-ex-demo.component';
import { BoardComponentsLibraryModule } from 'board-components-library';

@NgModule({
  declarations: [
    AppComponent,
    DropdownExDemoComponent,
    InputArrayExDemoComponent,
    InputDropdownExDemoComponent,
    InputExDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    BoardComponentsLibraryModule.forRoot('endd')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
