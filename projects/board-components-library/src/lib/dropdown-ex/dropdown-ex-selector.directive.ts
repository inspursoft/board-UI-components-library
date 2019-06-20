import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libDropdownExSelector]'
})
export class DropdownExSelectorDirective {
  constructor(public templateRef: TemplateRef<any>,
              public viewContainer: ViewContainerRef) {
  }

}
