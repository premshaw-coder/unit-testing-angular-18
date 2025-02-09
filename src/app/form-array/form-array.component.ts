import { Component } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {
  formArray!: FormArray;

  ngOnInit() {
    // this.initForm();
  }

  initForm() {
    this.formArray = new FormArray([new FormControl('', [Validators.required])]);
  }

  patchValue(data: string[]) {
    this.formArray.patchValue(data);
  }

  pushFormControl(initialValue: string | number, validators: ValidatorFn[]) {
    this.formArray.push(new FormControl(initialValue, validators))
  }

  insertFormControlAtSpecificPosition(index: number, initialValue: string | number, validators: ValidatorFn[]) {
    this.formArray.insert(index, new FormControl(initialValue, validators))
  }

  setValueAtSpecificPosition(index: number, value: string | number) {
    this.formArray.at(index).setValue(value);
  }

  addValidatorAtSpecificPosition(index: number, validators: ValidatorFn[]) {
    this.formArray.at(index).addValidators(validators);
  }

  removeValidatorAtSpecificPosition(index: number, validators: ValidatorFn[]) {
    this.formArray.at(index).removeValidators(validators);
  }

  getFormControlAtSpecificPosion(index: number) {
    return this.formArray ? this.formArray.at(index) : undefined;
  }

  removeFormControlFromSpecificPositon(index: number) {
    this.formArray.removeAt(1);
  }

  resetFormArray() {
    this.formArray.reset();
  }

  // checkFromArrayValidOrNot() {
  //   return this.formArray.valid;
  // }
}
