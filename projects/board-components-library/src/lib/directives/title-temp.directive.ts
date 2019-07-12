import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libTitleTemp]'
})
export class TitleTempDirective {
  constructor(public templateRef: TemplateRef<any>,
              public viewContainer: ViewContainerRef) {
  }
}
