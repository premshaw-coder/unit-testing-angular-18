import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

// Describe the test suite for AppComponent
describe('AppComponent', () => {
  let Component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Before each test, configure the testing module and create the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    Component = fixture.componentInstance;
  });

  // Describe the test suite for NgClass functionality
  describe('NgClass', () => {
    // Test to check if the light theme is applied
    it('should show the light theme', () => {
      Component.isDarkTheme = false;
      fixture.detectChanges(); // Trigger change detection
      let element = fixture.debugElement.query(By.css('#showThemes')); // Query the element
      let classList: DOMTokenList = element.nativeElement.classList; // Get the class list
      expect(classList.value).toBe('light-mode'); // Assert that 'light-mode' class is present
    });

    // Test to check if the dark theme is applied
    it('should show the dark theme', () => {
      Component.isDarkTheme = true;
      fixture.detectChanges(); // Trigger change detection
      let element = fixture.debugElement.query(By.css('#showThemes')); // Query the element
      let classList: DOMTokenList = element.nativeElement.classList; // Get the class list
      expect(classList.value).toBe('dark-mode'); // Assert that 'dark-mode' class is present
    });
  });

  // Describe the test suite for NgStyle functionality
  describe('NgStyle', () => {
    // Test to check if the font size is set to 16px
    it('should set the fontSize to be 16px', () => {
      Component.showLargeText = false;
      fixture.detectChanges(); // Trigger change detection
      let element = fixture.debugElement.query(By.css('#fontSize')); // Query the element
      expect(element.nativeElement.style.fontSize).toBe('16px'); // Assert that font size is '16px'
    });

    // Test to check if the font size is set to 200px
    it('should set the fontSize to be 200px', () => {
      Component.showLargeText = true;
      fixture.detectChanges(); // Trigger change detection
      let element = fixture.debugElement.query(By.css('#fontSize')); // Query the element
      expect(element.nativeElement.style.fontSize).toBe('200px'); // Assert that font size is '200px'
    });
  });
});
