import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CheckSelfValid, InputExCategory, InputExStatus, InputExType } from '../shared.types';

export class CustomInputExValidators {
  static passwordValidate(c: AbstractControl): ValidationErrors | null {
    const sourceElement: HTMLCollectionOf<Element> = document.getElementsByClassName('source-password');
    const verifyElement: HTMLCollectionOf<Element> = document.getElementsByClassName('verify-password');
    if (sourceElement && sourceElement.length > 0 && verifyElement && verifyElement.length > 0) {
      const source = (sourceElement.item(0) as HTMLInputElement).value;
      const verify = (verifyElement.item(0) as HTMLInputElement).value;
      if (source !== '' && verify !== '') {
        return source === verify ? null : {verifyPassword: 'verify-password'};
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'lib-input-ex',
  templateUrl: './input-ex.component.html',
  styleUrls: ['./input-ex.component.css']
})
export class InputExComponent implements OnInit, CheckSelfValid {
  private isDisabled = false;
  private revertValue: number | string;
  @Input() inputIsRequired = false;
  @Input() inputCategory = InputExCategory.iecString;
  @Input() inputLabelMinWidth = '180';
  @Input() inputLabel = '';
  @Input() inputType = InputExType.ietNormal;
  @Input() inputPattern: RegExp;
  @Input() inputMaxlength = 0;
  @Input() inputMinlength = 0;
  @Input() inputMax = 0;
  @Input() inputMin = 0;
  @Input() sourcePassword = false;
  @Input() verifyPassword = false;
  @Input() inputPlaceholder = '';
  @Input() validatorFns: Array<ValidatorFn>;
  @Input() validatorAsyncFn: AsyncValidatorFn;
  @Input() validatorMessage: Array<{ key: string, message: string }>;
  @Output() editEvent: EventEmitter<any>;
  @Output() revertEvent: EventEmitter<any>;
  @Output() commitEvent: EventEmitter<any>;
  @Output() valueChanges: EventEmitter<any>;
  @ViewChild('input') inputHtml: ElementRef;
  inputStatus: InputExStatus = InputExStatus.iesView;
  inputValidatorParam = '';
  inputFormGroup: FormGroup;
  inputControl: FormControl;
  inputValidatorFns: Array<ValidatorFn>;
  inputValidatorPending = false;

  constructor(private fb: FormBuilder) {
    this.editEvent = new EventEmitter();
    this.revertEvent = new EventEmitter();
    this.commitEvent = new EventEmitter();
    this.valueChanges = new EventEmitter();
    this.validatorMessage = new Array<{ key: string, message: string }>();
    this.inputValidatorFns = new Array<ValidatorFn>();
    this.inputControl = this.fb.control({value: '', disabled: this.isDisabled});
    this.inputFormGroup = this.fb.group({inputControl: this.inputControl}, {updateOn: 'blur'});
  }

  ngOnInit() {
    this.inputControl.valueChanges.subscribe((value: any) => this.valueChanges.next(value));
    this.inputControl.statusChanges.subscribe((value: any) => {
      if (this.inputControl.valid) {
        this.revertValue = this.inputControl.value;
        const commitValue = this.inputCategory === InputExCategory.iecNumber ?
          Number(this.inputControl.value) : this.inputControl.value;
        this.commitEvent.emit(commitValue);
      }
      if (this.inputValidatorPending) {
        this.onInputBlur();
      }
      this.inputValidatorPending = value === 'PENDING';
    });
    if (this.validatorFns) {
      this.inputValidatorFns = this.inputValidatorFns.concat(this.validatorFns);
    }
    if (this.inputIsRequired && this.inputType !== InputExType.ietClick) {
      this.inputValidatorFns.push(Validators.required);
    }
    if (this.inputMaxlength > 0) {
      this.inputValidatorFns.push(Validators.maxLength(this.inputMaxlength));
    }
    if (this.inputMinlength > 0) {
      this.inputValidatorFns.push(Validators.minLength(this.inputMinlength));
    }
    if (this.inputMax > 0) {
      this.inputValidatorFns.push(Validators.max(this.inputMax));
    }
    if (this.inputMin > 0) {
      this.inputValidatorFns.push(Validators.min(this.inputMin));
    }
    if (this.inputPattern) {
      this.inputValidatorFns.push(Validators.pattern(this.inputPattern));
    }
    if (this.verifyPassword || this.sourcePassword) {
      this.inputValidatorFns.push(CustomInputExValidators.passwordValidate);
    }
    this.inputControl.setValidators(this.inputValidatorFns);
    if (this.validatorAsyncFn) {
      this.inputControl.setAsyncValidators(this.validatorAsyncFn);
    }
  }

  @Input()
  set inputDisabled(value: boolean) {
    this.isDisabled = value;
    if (value) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  get inputDisabled(): boolean {
    return this.isDisabled;
  }

  @Input() set inputDefaultValue(value: string | number) {
    this.revertValue = value;
    this.inputControl.setValue(value);
  }

  @Input() set inputBindObjectField(bind: object) {
    if (bind && Reflect.has(bind, 'value')) {
      this.revertValue = Reflect.get(bind, 'value');
      this.inputControl.setValue(Reflect.get(bind, 'value'), {onlySelf: true});
    }
  }

  get showLabel(): boolean {
    return this.inputType !== InputExType.ietNoLabel;
  }

  get inputFieldTypeName(): string {
    switch (this.inputCategory) {
      case InputExCategory.iecNumber:
        return 'number';
      case InputExCategory.iecPassword:
        return 'password';
      case InputExCategory.iecEmail:
        return 'email';
      default:
        return 'text';
    }
  }

  getValidatorMessage(errors: ValidationErrors): string {
    this.inputValidatorParam = '';
    let result = '';
    this.validatorMessage.forEach(value => {
      if (Reflect.has(errors, value.key)) {
        result = value.message;
      }
    });
    if (result === '') {
      if (Reflect.has(errors, 'required')) {
        result = 'Input required.';
      } else if (Reflect.has(errors, 'pattern') && this.inputCategory === InputExCategory.iecNumber) {
        result = 'Only input number.';
      } else if (Reflect.has(errors, 'pattern') && this.inputCategory === InputExCategory.iecString) {
        result = 'The input does not conform to the rules.';
        this.inputValidatorParam = `:${this.inputPattern}`;
      } else if (Reflect.has(errors, 'maxlength')) {
        result = `Max length`;
        this.inputValidatorParam = `:${this.inputMaxlength}`;
      } else if (Reflect.has(errors, 'minlength')) {
        result = `Min length`;
        this.inputValidatorParam = `:${this.inputMinlength}`;
      } else if (Reflect.has(errors, 'max')) {
        result = `Max`;
        this.inputValidatorParam = `:${this.inputMax}`;
      } else if (Reflect.has(errors, 'min')) {
        result = `Min`;
        this.inputValidatorParam = `:${this.inputMin}`;
      } else if (Reflect.has(errors, 'verifyPassword')) {
        result = `The two passwords are inconsistent`;
      } else if (Object.keys(errors).length > 0) {
        result = errors[Object.keys(errors)[0]];
      }
    }
    return result;
  }

  onInputBlur() {
    if (this.inputControl.valid &&
      this.inputStatus === InputExStatus.iesEdit &&
      this.inputType !== InputExType.ietNoLabel) {
      this.inputStatus = InputExStatus.iesView;
    }
  }

  onInputFocus() {
    if (this.inputControl.enabled &&
      this.inputStatus === InputExStatus.iesView &&
      this.inputType !== InputExType.ietNoLabel) {
      this.inputStatus = InputExStatus.iesEdit;
    }
  }

  onRevertClick() {
    this.inputStatus = InputExStatus.iesView;
    this.inputControl.reset(this.revertValue);
    this.revertEvent.emit(this.inputControl.value);
  }

  onCommitClick(event: Event) {
    event.stopPropagation();
    this.inputStatus = InputExStatus.iesView;
  }

  onEditClick() {
    if (this.inputControl.enabled && this.inputType !== InputExType.ietNoLabel) {
      this.inputHtml.nativeElement.focus();
      if (document.activeElement === this.inputHtml.nativeElement) {
        this.inputStatus = InputExStatus.iesEdit;
        this.editEvent.emit(this.inputControl.value);
      }
    } else if (this.inputControl.enabled && this.inputType === InputExType.ietNoLabel) {
      this.inputHtml.nativeElement.blur();
      this.editEvent.emit(this.inputControl.value);
    }
  }

  public checkSelf() {
    if (this.inputControl.enabled) {
      (this.inputHtml.nativeElement as HTMLElement).focus();
      this.inputControl.markAsTouched({onlySelf: true});
      this.inputControl.updateValueAndValidity();
    }
  }

  public get isValid(): boolean {
    return this.inputControl.valid && this.inputStatus === InputExStatus.iesView;
  }
}
