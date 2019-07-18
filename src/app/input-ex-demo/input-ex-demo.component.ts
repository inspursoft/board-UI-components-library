import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputExComponent } from 'board-components-library';

@Component({
  selector: 'app-input-ex-demo',
  templateUrl: './input-ex-demo.component.html',
  styleUrls: ['./input-ex-demo.component.css']
})
export class InputExDemoComponent implements OnInit {
  @ViewChild(InputExComponent) inputExTitle: InputExComponent;
  title = 'board-library';
  age = 0;
  password = '';
  email = '';
  disabled = false;
  validator = '';
  asyncValidator = '';

  ngOnInit(): void {
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  checkValue() {
    this.inputExTitle.checkSelf();
  }

  checkControlFun() {
    return this.checkControl.bind(this);
  }

  checkAsyncControlFun() {
    return this.checkAsyncControl.bind(this);
  }

  checkAsyncControl(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise(resolve => {
      if (control.value === this.title) {
        setTimeout(() => resolve({exists: 'exists'}), 2000);
      } else {
        resolve(null);
      }
    });
  }

  checkControl(control: AbstractControl): ValidationErrors | null {
    if (control.value === this.title) {
      return {repeat: 'repeat'};
    } else {
      return null;
    }
  }

}
