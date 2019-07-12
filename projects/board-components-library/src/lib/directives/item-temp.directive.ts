import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libItemTemp]'
})
export class ItemTempDirective {
  constructor(public templateRef: TemplateRef<any>,
              public viewContainer: ViewContainerRef) {
  }
}
