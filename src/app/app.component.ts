import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Select } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { Message } from 'primeng/message';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, CheckboxModule,
    DatePicker, MultiSelectModule, ToggleSwitch, Select, RadioButton, Message
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  collectiveForm!: FormGroup;
  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  categories1: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  patchValueData = {
    inputField: 'Hello',
    dateField: "2025-02-12T18:30:00.000Z",
    multiSelectField: [
      {
        name: "Rome",
        code: "RM"
      },
      {
        name: "London",
        code: "LDN"
      }
    ],
    selectfield: {
      name: "London",
      code: "LDN"
    },
  }

  setValueData = {
    inputField: "sdsd",
    checkboxField: [
      {
        name: "Marketing",
        key: "M"
      },
      {
        name: "Production",
        key: "P"
      }
    ],
    dateField: "2025-02-12T18:30:00.000Z",
    multiSelectField: [
      {
        name: "Rome",
        code: "RM"
      },
      {
        name: "London",
        code: "LDN"
      }
    ],
    togglefield: true,
    selectfield: {
      name: "London",
      code: "LDN"
    },
    radiofield: {
      name: "Accounting",
      key: "A"
    }
  }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.collectiveForm = new FormGroup({
      inputField: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      checkboxField: new FormControl('', [Validators.required]),
      dateField: new FormControl('', [Validators.required]),
      multiSelectField: new FormControl('', [Validators.required]),
      togglefield: new FormControl('', [Validators.required]),
      selectfield: new FormControl('', [Validators.required]),
      radiofield: new FormControl('', [Validators.required]),
    })
  }

  submitForm() {
    if (this.collectiveForm.invalid) {
      this.collectiveForm.markAllAsTouched()
      return;
    }
    console.log('Form submitted', this.collectiveForm.value)
  }

  setValuesInForm(formData: any) {
    const selectedRadioItem = this.categories1?.find(item => item?.key === formData?.radiofield?.key) || this.categories1[0]
    this.collectiveForm.setValue({
      inputField: formData.inputField,
      checkboxField: formData.checkboxField,
      dateField: new Date(formData.dateField),
      multiSelectField: formData.multiSelectField,
      togglefield: formData.togglefield,
      selectfield: formData.selectfield,
      radiofield: selectedRadioItem
    });
  }
  patchvaluesInForm(formData: any) {
    this.collectiveForm.patchValue({
      inputField: formData.inputField,
      dateField: new Date(formData.dateField),
      multiSelectField: formData.multiSelectField,
      selectfield: formData.selectfield,
    })
  }
  resetForm() {
    this.collectiveForm.reset();
  }
}
