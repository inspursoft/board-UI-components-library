import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { BoardComponentsLibraryModule } from '../../projects/board-components-library/src/lib/board-components-library.module';

@NgModule({
  declarations: [
    AppComponent
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
