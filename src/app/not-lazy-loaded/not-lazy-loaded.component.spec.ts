import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLazyLoadedComponent } from './not-lazy-loaded.component';

describe('NotLazyLoadedComponent', () => {
  let component: NotLazyLoadedComponent;
  let fixture: ComponentFixture<NotLazyLoadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotLazyLoadedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotLazyLoadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
