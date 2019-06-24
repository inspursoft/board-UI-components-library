import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libInputDropdownExSelector]'
})
export class InputDropdownExSelectorDirective {
  constructor(public templateRef: TemplateRef<any>,
              public viewContainer: ViewContainerRef) {
  }

}
