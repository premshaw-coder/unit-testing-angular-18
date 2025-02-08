import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';// Import PrimeNG Message module if needed
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule, FormsModule, NoopAnimationsModule, MessageModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.initForm();
    // fixture.detectChanges();
  });

  it('should create the app', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  describe('Set Value in Form', () => {
    // Sample data to be used for setting values in the form
    let setValueData = {
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
    };

    it('should set the form values correctly from setValueData', () => {
      // Call the component function to set values in the form
      component.setValuesInForm(setValueData);

      // Retrieve the form values
      const formValue = component.collectiveForm.value;

      // Convert date field to ISO string for comparison
      formValue.dateField = formValue.dateField.toISOString();

      // Check if form values match the provided data
      expect(formValue).toEqual(setValueData);
    });

    it('should call setValuesInForm once and set form values correctly', () => {
      // Spy on the setValuesInForm method to track its calls
      spyOn(component, 'setValuesInForm').and.callThrough();

      // Call the component function to set values in the form
      component.setValuesInForm(setValueData);

      // Verify that the function was called once
      expect(component.setValuesInForm).toHaveBeenCalledTimes(1);

      // Retrieve the form values
      const formValue = component.collectiveForm.value;

      // Convert date field to ISO string for comparison
      formValue.dateField = formValue.dateField.toISOString();

      // Check if form values match the provided data
      expect(formValue).toEqual(setValueData);

      // Verify that the function was called with the correct data
      expect(component.setValuesInForm).toHaveBeenCalledWith(setValueData);
    });
  });

  describe('Patch Value in Form', () => {
    // Sample data to be used for patching values in the form
    let patchValueData = {
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
      checkboxField: '',
      togglefield: '',
      radiofield: ''
    };

    it('should patch the form values correctly from patchValueData', () => {
      // Call the component function to patch values in the form
      component.patchvaluesInForm(patchValueData);

      // Retrieve the form values
      const formValue = component.collectiveForm.value;

      // Convert date field to ISO string for comparison
      formValue.dateField = formValue.dateField.toISOString();

      // Check if form values match the provided data
      expect(formValue).toEqual(patchValueData);
    });

    it('should call patchValuesInForm once and patch form values correctly', () => {
      // Spy on the patchValuesInForm method to track its calls
      spyOn(component, 'patchvaluesInForm').and.callThrough();

      // Call the component function to patch values in the form
      component.patchvaluesInForm(patchValueData);

      // Verify that the function was called once
      expect(component.patchvaluesInForm).toHaveBeenCalledTimes(1);

      // Retrieve the form values
      const formValue = component.collectiveForm.value;

      // Convert date field to ISO string for comparison
      formValue.dateField = formValue.dateField.toISOString();

      // Check if form values match the provided data
      expect(formValue).toEqual(patchValueData);

      // Verify that the function was called with the correct data
      expect(component.patchvaluesInForm).toHaveBeenCalledWith(patchValueData);
    });
  });

  // Unit tests for Reset Form functionality
  describe('Reset Form', () => {
    // Define the expected initial form data
    let formData = {
      inputField: null,
      dateField: null,
      multiSelectField: null,
      selectfield: null,
      checkboxField: null,
      togglefield: null,
      radiofield: null
    };

    // Test to check if the form is reset properly
    it('should reset the form to its initial state', () => {
      component.resetForm();
      expect(component.collectiveForm.value).toEqual(formData);
    });

    // Test to check if the resetForm function is called once and resets the form correctly
    it('should verify the resetForm function is called once and resets the form values', () => {
      spyOn(component, 'resetForm').and.callThrough();
      component.resetForm();
      expect(component.resetForm).toHaveBeenCalledTimes(1);
      expect(component.collectiveForm.value).toEqual(formData);
    });
  });

  // Unit tests for Form Initialization functionality
  describe('Form Initialization', () => {
    // Test to check the initial values of the form
    it('should verify the initial values of the form fields', () => {
      let formData = {
        inputField: '',
        dateField: '',
        multiSelectField: '',
        selectfield: '',
        checkboxField: '',
        togglefield: '',
        radiofield: ''
      };
      expect(component.collectiveForm.value).toEqual(formData);
    });
  });


  describe('Form Validation', () => {
    // Unit tests for InputField Validation functionality
    describe('InputField Validation', () => {

      // Test to check if required error message is displayed when inputField is empty and touched
      it('should display required error message when inputField is empty and touched', () => {
        fixture.detectChanges();
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField?.markAsTouched();
          inputField?.patchValue('');
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('InputField is required');
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that required error message is not displayed when inputField has a value
      it('should not display required error message when inputField has a value', () => {
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField.markAsTouched();
          inputField.setValue('test value'); // Set a non-empty value
          fixture.detectChanges();
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldRequired'));
          expect(errorMessage).toBeFalsy(); // Error message should not be present
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that required error message is not displayed when inputField is not touched
      it('should not display required error message when inputField is not touched', () => {
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField.setValue(''); // Set an empty value
          fixture.detectChanges();
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldRequired'));
          expect(errorMessage).toBeFalsy(); // Error message should not be present
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that minLength error message is displayed when inputField value is less than 2 characters
      it('should display minLength error message when inputField value is less than 2 characters', () => {
        fixture.detectChanges();
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField?.markAsTouched();
          inputField?.patchValue('h');
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldMinLength'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('InputField min-length should not exceed more than than 2');
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that minLength error message is not displayed when inputField value is more than 1 character
      it('should not display minLength error message when inputField value is more than 1 character', () => {
        fixture.detectChanges();
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField?.markAsTouched();
          inputField?.patchValue('hq');
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldMinLength'));
          expect(errorMessage).toBeFalsy(); // Check that the error message element is not found
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that maxLength error message is not displayed when inputField value is less than 11 characters
      it('should not display maxLength error message when inputField value is less than 11 characters', () => {
        fixture.detectChanges();
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField?.markAsTouched();
          inputField?.patchValue('hfsfs');
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldMaxLength'));
          expect(errorMessage).toBeFalsy(); // Check that the error message element is not found
        } else {
          fail("inputField control not found");
        }
      });

      // Test to check that maxLength error message is displayed when inputField value is more than 10 characters
      it('should display maxLength error message when inputField value is more than 10 characters', () => {
        fixture.detectChanges();
        const inputField = component.collectiveForm.get('inputField');
        if (inputField) {
          inputField?.markAsTouched();
          inputField?.patchValue('hfsdfsgsgsgq');
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#inputFieldMaxLength'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('InputField max-length should not exceed more than than 10');
        } else {
          fail("inputField control not found");
        }
      });
    });

    // Unit tests for Checkbox Validation functionality
    describe('Checkbox Validation', () => {

      // Test to validate required checkbox field
      it('should validate required in checkbox field process-1', () => {
        const checkboxField = component.collectiveForm.get('checkboxField');
        if (checkboxField) {
          checkboxField.setValue(null);
          expect(checkboxField.invalid).toBeTruthy();
          expect(checkboxField?.errors?.['required']).toBeTruthy();
        } else {
          fail("checkboxField control not found");
        }
      });

      // Test to display required error message when checkbox is empty
      it('should display required error message when checkbox is empty process-2', () => {
        fixture.detectChanges();
        const checkboxField = component.collectiveForm.get('checkboxField');
        if (checkboxField) {
          checkboxField?.markAsTouched();
          checkboxField?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#checkBoxFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('checkboxField is required');
        } else {
          fail("checkboxField control not found");
        }
      });
    });

    // Unit tests for DateField Validation functionality
    describe('DateField Validation', () => {

      // Test to validate required date field
      it('should validate required in dateField process-1', () => {
        const dateField = component.collectiveForm.get('dateField');
        if (dateField) {
          dateField.setValue(null);
          expect(dateField.invalid).toBeTruthy();
          expect(dateField?.errors?.['required']).toBeTruthy();
        } else {
          fail("dateField control not found");
        }
      });

      // Test to display required error message when date field is empty
      it('should display required error message when dateField is empty process-2', () => {
        fixture.detectChanges();
        const dateField = component.collectiveForm.get('dateField');
        if (dateField) {
          dateField?.markAsTouched();
          dateField?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#dateFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('dateField is required');
        } else {
          fail("dateField control not found");
        }
      });
    });

    // Unit tests for MultiSelectField Validation functionality
    describe('MultiSelectField Validation', () => {

      // Test to validate required multiSelectField
      it('should validate required in multiSelectField process-1', () => {
        const multiSelectField = component.collectiveForm.get('multiSelectField');
        if (multiSelectField) {
          multiSelectField.setValue(null);
          expect(multiSelectField.invalid).toBeTruthy();
          expect(multiSelectField?.errors?.['required']).toBeTruthy();
        } else {
          fail("multiSelectField control not found");
        }
      });

      // Test to display required error message when multiSelectField is empty
      it('should display required error message when multiSelectField is empty process-2', () => {
        fixture.detectChanges();
        const multiSelectField = component.collectiveForm.get('multiSelectField');
        if (multiSelectField) {
          multiSelectField?.markAsTouched();
          multiSelectField?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#multiSelectFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('multiSelectField is required');
        } else {
          fail("multiSelectField control not found");
        }
      });
    });

    // Unit tests for Togglefield Validation functionality
    describe('Togglefield Validation', () => {

      // Test to validate required togglefield
      it('should validate required in togglefield process-1', () => {
        const togglefield = component.collectiveForm.get('togglefield');
        if (togglefield) {
          togglefield.setValue(null);
          expect(togglefield.invalid).toBeTruthy();
          expect(togglefield?.errors?.['required']).toBeTruthy();
        } else {
          fail("togglefield control not found");
        }
      });

      // Test to display required error message when togglefield is empty
      it('should display required error message when togglefield is empty process-2', () => {
        fixture.detectChanges();
        const togglefield = component.collectiveForm.get('togglefield');
        if (togglefield) {
          togglefield?.markAsTouched();
          togglefield?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#toggleFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('togglefield is required');
        } else {
          fail("togglefield control not found");
        }
      });
    });

    // Unit tests for Selectfield Validation functionality
    describe('Selectfield Validation', () => {

      // Test to validate required selectfield
      it('should validate required in selectfield process-1', () => {
        const selectfield = component.collectiveForm.get('selectfield');
        if (selectfield) {
          selectfield.setValue(null);
          expect(selectfield.invalid).toBeTruthy();
          expect(selectfield?.errors?.['required']).toBeTruthy();
        } else {
          fail("selectfield control not found");
        }
      });

      // Test to display required error message when selectfield is empty
      it('should display required error message when selectfield is empty process-2', () => {
        fixture.detectChanges();
        const selectfield = component.collectiveForm.get('selectfield');
        if (selectfield) {
          selectfield?.markAsTouched();
          selectfield?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#selectFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('selectfield is required');
        } else {
          fail("selectfield control not found");
        }
      });
    });

    // Unit tests for Radiofield Validation functionality
    describe('Radiofield Validation', () => {

      // Test to validate required radiofield
      it('should validate required in radiofield process-1', () => {
        const radiofield = component.collectiveForm.get('radiofield');
        if (radiofield) {
          radiofield.setValue(null);
          expect(radiofield.invalid).toBeTruthy();
          expect(radiofield?.errors?.['required']).toBeTruthy();
        } else {
          fail("radiofield control not found");
        }
      });

      // Test to display required error message when radiofield is empty
      it('should display required error message when radiofield is empty process-2', () => {
        fixture.detectChanges();
        const radiofield = component.collectiveForm.get('radiofield');
        if (radiofield) {
          radiofield?.markAsTouched();
          radiofield?.patchValue(null);
          fixture.detectChanges(); // Trigger change detection
          const errorMessage = fixture.debugElement.query(By.css('#radioButtonFieldRequired'));
          expect(errorMessage).toBeTruthy(); // Check that the error message element is found
          expect(errorMessage.nativeElement.textContent).toContain('radiofield is required');
        } else {
          fail("radiofield control not found");
        }
      });
    });
  })
});
