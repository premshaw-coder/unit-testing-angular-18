import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayComponent } from './form-array.component';
import { Validators } from '@angular/forms';

fdescribe('FormArrayComponent', () => {
  let component: FormArrayComponent;
  let fixture: ComponentFixture<FormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should initiate the formArray', () => {
    expect(component.formArray).not.toBeDefined();
    component.initForm();
    fixture.detectChanges();
    expect(component.formArray).toBeDefined();
    expect(component.formArray.length).toBe(1);
  })

  it('should get the formControl at specific position', () => {
    expect(component.getFormControlAtSpecificPosion(0)).not.toBeDefined();
    component.initForm();
    fixture.detectChanges();
    expect(component.getFormControlAtSpecificPosion(0)).toBeDefined();
  })

  describe('formArray', () => {
    beforeEach(async () => {
      component.initForm();
      fixture.detectChanges();
    });
    it('should patch value to to formArray', () => {
      component.patchValue(['souvik']);
      fixture.detectChanges();
      expect(component.formArray.value).toEqual(['souvik'])
    })

    it('should add a formcontrol at end posion of FormArray', () => {
      let length = component.formArray.length;
      component.pushFormControl('', [Validators.required])
      fixture.detectChanges();
      expect(component.formArray.length).toBe(length + 1)
    })

    it('should insert formControl at specific position', () => {
      let value = 'test0'
      fixture.autoDetectChanges();
      component.pushFormControl('', [Validators.required]);
      let length = component.formArray.length;
      component.insertFormControlAtSpecificPosition(1, value, []);
      expect(component.formArray.length).toBe(length + 1)
      expect(component.getFormControlAtSpecificPosion(1)?.value).toBe(value)
    })

    it('should set Value in formControl at specific position', () => {
      let value = 'updatedValue0'
      fixture.autoDetectChanges();
      component.setValueAtSpecificPosition(0, value);
      expect(component.getFormControlAtSpecificPosion(0)?.value).toBe(value)
    })

    it('should add validator at specific position', () => {
      let value = 'updatedValue0'
      fixture.autoDetectChanges();
      component.addValidatorAtSpecificPosition(0, [Validators.minLength(5)]);
      expect(component.getFormControlAtSpecificPosion(0)?.valid).toBe(false);
      component.patchValue([value]);
      expect(component.getFormControlAtSpecificPosion(0)?.valid).toBe(true);
    })

    it('should remove validator at specific position', () => {
      const minValidator = Validators.min(3);
      component.addValidatorAtSpecificPosition(0, [minValidator]);
      expect(component.formArray.at(0).hasValidator(minValidator)).toEqual(true)
      component.removeValidatorAtSpecificPosition(0, [Validators.minLength(5)]);
      expect(component.formArray.at(0).hasValidator(Validators.min(3))).toEqual(false)
    })

    it('should remove validator at specific position', () => {
      let position = 1, data = 'data0';
      component.pushFormControl(data, [Validators.required])
      component.pushFormControl('data1', [Validators.required])
      fixture.autoDetectChanges();
      let length = component.formArray.length;
      component.removeFormControlFromSpecificPositon(position);
      expect(component.formArray.length).toBe(length - 1);
      expect(component.formArray.at(position).value).not.toBe(data)
    })

    it('should reset whole formArray', () => {
      let values = ['test0', 'test1']
      component.pushFormControl('', [])
      component.pushFormControl('', [Validators.required])
      fixture.autoDetectChanges();
      component.patchValue(values);
      expect(component.formArray.value).toEqual(values);
      component.resetFormArray();
      expect(component.formArray.value).toEqual([null, null]);
    })
  })
});
