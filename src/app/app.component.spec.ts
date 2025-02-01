import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('Structural-directive', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngIf', () => {
    it('should display the conditional element when condition is true', () => {
      // Set the isVisible property to true
      component.isVisible = true;

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for the element with class 'show_data'
      const element = fixture.debugElement.query(By.css('.show_data'));

      // Verify that the element is present in the DOM
      expect(element).toBeTruthy();
    });

    it('should not display the conditional element when condition is false', () => {
      // Set the isVisible property to false
      component.isVisible = false;

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for the element with class 'show_data'
      const element = fixture.debugElement.query(By.css('.show_data'));

      // Verify that the element is not present in the DOM
      expect(element).toBeNull();
    });

    it('should display correct content when visible', () => {
      // Set the isVisible property to true
      component.isVisible = true;

      // Set the dynamicText property with the desired content
      component.dynamicText = 'Hello, Angular!';

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for the element with class 'show_data'
      const element = fixture.debugElement.query(By.css('.show_data'));

      // Verify that the element's content matches the dynamic text
      expect(element.nativeElement.textContent).toContain('Hello, Angular!');
    });

  })

  describe('ngFor', () => {
    it('should display the correct number of elements', () => {
      // Initial setup of userData array with two items
      component.userData = [
        { name: 'John', age: 25, email: 'prem1@gmail.com' },
        { name: 'Doe', age: 30, email: 'prem2@gmail.com' }
      ];

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for elements with class 'user_data'
      const elements = fixture.debugElement.queryAll(By.css('.user_data'));

      // Verify the number of queried 'user_data' elements
      expect(elements.length).toBe(2);
    });


    it('should display the correct item content', () => {
      // Initial setup of userData array with two items
      component.userData = [
        { name: 'John', age: 25, email: 'prem1@gmail.com' },
        { name: 'Doe', age: 30, email: 'prem2@gmail.com' }
      ];

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for elements with class 'user_name'
      const names = fixture.debugElement.queryAll(By.css('.user_name'));

      // Query the DOM for elements with class 'user_email'
      const emails = fixture.debugElement.queryAll(By.css('.user_email'));

      // Verify the content of the first 'user_name' element
      expect(names[0].nativeElement.textContent).toContain('John');

      // Verify the content of the first 'user_email' element
      expect(emails[0].nativeElement.textContent).toContain('prem1@gmail.com');

      // Verify the content of the second 'user_name' element
      expect(names[1].nativeElement.textContent).toContain('Doe');

      // Verify the content of the second 'user_email' element
      expect(emails[1].nativeElement.textContent).toContain('prem2@gmail.com');
    });


    it('should add a new item to the list', () => {
      // Initial setup of userData array with two items
      component.userData = [
        { name: 'John', age: 25, email: 'prem1@gmail.com' },
        { name: 'Doe', age: 30, email: 'prem2@gmail.com' }
      ];

      // Verify initial length of the userData array
      expect(component.userData.length).toBe(2);

      // Add a new item to the userData array
      component.userData.push({ name: 'prem shaw', age: 30, email: 'premshaw@gmail.com' });

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for elements with class 'user_name'
      const names = fixture.debugElement.queryAll(By.css('.user_name'));

      // Query the DOM for elements with class 'user_email'
      const emails = fixture.debugElement.queryAll(By.css('.user_email'));

      // Verify the length of queried 'user_name' elements
      expect(names.length).toBe(3);

      // Verify the length of queried 'user_email' elements
      expect(emails.length).toBe(3);
    });

    it('should remove the last item from the list', () => {
      // Initial setup of userData array with three items
      component.userData = [
        { name: 'John', age: 25, email: 'prem1@gmail.com' },
        { name: 'Doe', age: 30, email: 'prem2@gmail.com' },
        { name: 'prem shaw', age: 30, email: 'premshaw@gmail.com' }
      ];

      // Verify initial length of the userData array
      expect(component.userData.length).toBe(3);

      // Remove the last item from the userData array
      component.userData.pop();

      // Trigger change detection to update the view
      fixture.detectChanges();

      // Query the DOM for elements with class 'user_name'
      const names = fixture.debugElement.queryAll(By.css('.user_name'));

      // Query the DOM for elements with class 'user_email'
      const emails = fixture.debugElement.queryAll(By.css('.user_email'));

      // Verify the length of queried 'user_name' elements
      expect(names.length).toBe(2);

      // Verify the length of queried 'user_email' elements
      expect(emails.length).toBe(2);
    });
  })
});
