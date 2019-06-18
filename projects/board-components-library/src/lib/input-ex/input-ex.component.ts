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

enum InputExCategory {
  iecString = 1, iecNumber, iecPassword, iecEmail
}

enum InputExType {
  ietNormal = 1, ietClick, ietNoLabel
}

enum InputExStatus {
  iesEdit = 1, iesView
}

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

export class InputExComponent implements OnInit {
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

  @Input() set inputBindField(value: string | number) {
    this.revertValue = value;
    this.inputControl.setValue(value);
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
        result = '字段为必填项';
      } else if (Reflect.has(errors, 'pattern') && this.inputCategory === InputExCategory.iecNumber) {
        result = '只能输入数字';
      } else if (Reflect.has(errors, 'pattern') && this.inputCategory === InputExCategory.iecString) {
        result = '输入不符合规则';
        this.inputValidatorParam = `:${this.inputPattern}`;
      } else if (Reflect.has(errors, 'maxlength')) {
        result = `最大长度`;
        this.inputValidatorParam = `:${this.inputMaxlength}`;
      } else if (Reflect.has(errors, 'minlength')) {
        result = `最小长度`;
        this.inputValidatorParam = `:${this.inputMinlength}`;
      } else if (Reflect.has(errors, 'max')) {
        result = `最大值`;
        this.inputValidatorParam = `:${this.inputMax}`;
      } else if (Reflect.has(errors, 'min')) {
        result = `最小值`;
        this.inputValidatorParam = `:${this.inputMin}`;
      } else if (Reflect.has(errors, 'verifyPassword')) {
        result = `两次密码内容不一致`;
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

  public checkInputSelf() {
    if (this.inputControl.enabled && (this.inputControl.touched || this.inputIsRequired)) {
      this.inputControl.markAsTouched({onlySelf: true});
      this.inputControl.updateValueAndValidity();
    }
  }
}
