import { ComponentFixture, TestBed } from '@angular/core/testing';

import { paramsIdComponent } from './paramsId.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('paramsIdComponent', () => {
  let component: paramsIdComponent;
  let fixture: ComponentFixture<paramsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, paramsIdComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => key === 'id' ? '123' : null }), // Mock paramMap
            queryParamMap: of({ get: (key: string) => key === 'queryParam' ? 'value' : null }) // Mock queryParamMap
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(paramsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
