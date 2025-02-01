import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Describe the test suite for AppComponent
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Before each test, configure the testing module and create the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Import the AppComponent
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Test to check if the app component is created
  it('should create the app', () => {
    expect(component).toBeTruthy(); // Assert that the component is created successfully
  });

  // Describe the test suite for Template Reference Variable functionality
  describe('Template Reference Variable', () => {
    // Test to check if the paragraph element is accessed via template reference
    it('should access the paragraph via template reference', () => {
      const paragraphElement = fixture.nativeElement.querySelector('#myParagraph'); // Query the paragraph element
      console.log('paragraph', paragraphElement);
      expect(paragraphElement).not.toBeNull(); // Assert that the paragraph element is not null
      expect(paragraphElement.textContent).toContain('This is a paragraph.'); // Assert that the text content is correct
    });

    // Test to check if the text changes when the button is clicked
    it('should change the text when the button is clicked', () => {
      const button = fixture.nativeElement.querySelector('button'); // Query the button element
      button.click(); // Simulate the button click
      fixture.detectChanges(); // Trigger change detection
      const paragraphElement = fixture.nativeElement.querySelector('#myParagraph'); // Query the paragraph element
      expect(paragraphElement.textContent).toContain('Text changed!'); // Assert that the text content is updated
    });
  });

  // Describe the test suite for ViewChild functionality
  describe('ViewChild', () => {
    // Test to check if the paragraph element is accessed via ViewChild
    it('should access the paragraph via view child', () => {
      fixture.detectChanges(); // Trigger change detection
      const paragraph = fixture.componentInstance.myParagraph; // Access the paragraph element via ViewChild
      expect(paragraph).not.toBeNull(); // Assert that the paragraph element is not null
      expect(paragraph.nativeElement.textContent).toContain('This is a paragraph.'); // Assert that the text content is correct
    });

    // Test to check if the paragraph element value changes via ViewChild
    it('should access the paragraph via viewchild if the value changes', () => {
      fixture.detectChanges(); // Trigger change detection
      const paragraph = fixture.componentInstance.myParagraph; // Access the paragraph element via ViewChild
      expect(paragraph).not.toBeNull(); // Assert that the paragraph element is not null
      component.myParagraph.nativeElement.textContent = 'prem'; // Change the text content
      expect(paragraph.nativeElement.textContent).toContain('prem'); // Assert that the text content is updated
    });

    // Test to check if the paragraph element value changes via ViewChild on button click
    it('should access the paragraph value via viewchild if the value changes on button click', () => {
      const button = fixture.nativeElement.querySelector('button'); // Query the button element
      button.click(); // Simulate the button click
      fixture.detectChanges(); // Trigger change detection
      const paragraphElement = fixture.nativeElement.querySelector('#myParagraph'); // Query the paragraph element
      expect(paragraphElement.textContent).toContain('Text changed!'); // Assert that the text content is updated
    });
  });
});
