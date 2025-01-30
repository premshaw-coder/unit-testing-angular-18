import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildComponent } from './child.component';

describe('Child Component', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input()', () => {
    // Test default value for 'message' input property
    it('should set default message value', () => {
      // Expect the default 'message' to be an empty string
      expect(component.message).toBe('');
    });

    // Test updating the 'message' input and verifying the change in the template
    it('should update message when input changes', () => {
      const testMessage = 'Hello World';
      component.message = testMessage; // Set the 'message' input to 'Hello World'
      fixture.detectChanges(); // Trigger Angular's change detection
      const messageElement = element.querySelector('.message'); // Select the element displaying the message
      expect(messageElement?.textContent).toBe(testMessage); // Check if the element's text matches 'Hello World'
    });

    // Test handling of an empty 'message' input
    it('should handle empty message', () => {
      component.message = ''; // Set the 'message' input to an empty string
      fixture.detectChanges(); // Trigger change detection
      const messageElement = element.querySelector('.message'); // Select the message element
      expect(messageElement?.textContent).toBe(''); // Verify that the element's text is empty
    });
    // Test default value for 'count' input property
    it('should set default count value', () => {
      // Expect the default 'count' to be zero
      expect(component.count).toBe(0);
    });

    // Test updating the 'count' input and verifying the change in the template
    it('should update count when input changes', () => {
      const testCount = 42;
      component.count = testCount; // Set the 'count' input to 42
      fixture.detectChanges(); // Trigger change detection
      const countElement = element.querySelector('.count'); // Select the element displaying the count
      expect(countElement?.textContent).toBe(testCount.toString()); // Check if the element's text matches '42'
    });

    // Test handling of a zero 'count' input
    it('should handle zero count', () => {
      component.count = 0; // Set the 'count' input to zero
      fixture.detectChanges(); // Trigger change detection
      const countElement = element.querySelector('.count'); // Select the count element
      expect(countElement?.textContent).toBe('0'); // Verify that the element's text is '0'
    });

    // Test that the component's 'count' property updates correctly when input is a number
    it('should update count when input value is a number', () => {
      const testCount = 42;
      component.count = testCount; // Set the 'count' input to 42
      fixture.detectChanges(); // Trigger change detection
      expect(component.count).toBe(testCount); // Confirm that the component's 'count' is 42
    });

    describe('Parent component interaction', () => {

      // Test receiving updates from a parent component
      it('should receive updates from parent component', () => {
        // Simulate the parent component updating the inputs
        component.message = 'Updated from parent';
        component.count = 100;
        fixture.detectChanges(); // Trigger change detection

        // Select the elements displaying the inputs
        const messageElement = element.querySelector('.message');
        const countElement = element.querySelector('.count');

        // Verify that the displayed text matches the updated inputs
        expect(messageElement?.textContent).toBe('Updated from parent');
        expect(countElement?.textContent).toBe('100');
      });
    });
  });

  describe('@Output()', () => {
    let userDummyData = { name: 'prem', age: 25 }
    it('should emit the correct value when the button is clicked', () => {
      spyOn(component.userData, 'emit'); // Spy on the emit method
      const button = fixture.nativeElement.querySelector('#btn1');
      button.click(); // Simulate a button click
      component.userData.emit(userDummyData); // Emit the dummy data
      expect(component.userData.emit).toHaveBeenCalledWith(userDummyData); // Verify the emitted value
    });

    it('should output the user data', (done) => {
      const spy = spyOn(component, 'onUser').and.callFake(() => {
        // Custom implementation of onUser
        component.userData.emit(userDummyData);
      });

      // Subscribe to userData once and perform the assertion
      component.userData.asObservable().subscribe((userdata) => {
        if (userdata) {
          expect(userdata).toEqual(userDummyData);
          done();
        }
      });

      component.onUser(); // Trigger the method
      expect(spy).toHaveBeenCalled(); // Verify the method is called
      fixture.detectChanges(); // Trigger change detection
    });
  })

});
