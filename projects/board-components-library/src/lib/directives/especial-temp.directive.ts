import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libEspecialTemp]'
})
export class EspecialTempDirective {
  constructor(public templateRef: TemplateRef<any>,
              public viewContainer: ViewContainerRef) {
  }
}
