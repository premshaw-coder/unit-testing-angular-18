import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryparamsComponent } from './queryparams.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

describe('QueryparamsComponent', () => {
  let component: QueryparamsComponent;
  let fixture: ComponentFixture<QueryparamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, QueryparamsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: (key: string) => key === 'queryParam' ? 'value' : null }) // Mock queryParamMap
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QueryparamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
