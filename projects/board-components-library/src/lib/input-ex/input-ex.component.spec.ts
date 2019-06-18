import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputExComponent } from './input-ex.component';

describe('InputExComponent', () => {
  let component: InputExComponent;
  let fixture: ComponentFixture<InputExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
