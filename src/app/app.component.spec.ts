import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LazyLoadedComponent } from './lazy-loaded/lazy-loaded.component';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Location } from '@angular/common';
import { NotLazyLoadedComponent } from './not-lazy-loaded/not-lazy-loaded.component';
import { of } from 'rxjs/internal/observable/of';
import { paramsIdComponent } from './paramsId/paramsId.component';
import { QueryparamsComponent } from './queryparams/queryparams.component';

describe('Router Unit Test', () => {
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'custom',
          loadComponent: () => import('./lazy-loaded/lazy-loaded.component')
            .then(m => m.LazyLoadedComponent)
        },
        {
          path: 'not-lazy-loaded', component: NotLazyLoadedComponent
        },
        {
          path: 'employees/:id', component: paramsIdComponent
        },
        {
          path: 'queryparams', component: QueryparamsComponent
        }
        ]),
        AppComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => key === 'id' ? '123' : null }), // Mock paramMap
            queryParamMap: of({ get: (key: string) => key === 'queryParam' ? 'value' : null }) // Mock queryParamMap
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AppComponent);
  });
  describe('Lazy loaded components', () => {
    it('should create the lazy loaded component', fakeAsync(async () => {
      await router.navigate(['/custom']);
      tick(); // Wait for lazy loading and navigation

      // Single change detection after navigation is complete
      fixture.detectChanges();
      expect(location.path()).toBe('/custom');
      // Assert component is loaded correctly
      const component = fixture.debugElement.query(By.directive(LazyLoadedComponent));
      if (!component) {
        fail('Lazy loaded component was not created');
      }

      // Query for the custom component
      const lazyComponentDE = fixture.debugElement.query(By.directive(LazyLoadedComponent));
      expect(lazyComponentDE).toBeTruthy();

      // Verify component instance
      const lazyComponent = lazyComponentDE?.componentInstance;
      expect(lazyComponent).toBeTruthy();
      expect(lazyComponent instanceof LazyLoadedComponent).toBeTruthy();
    }));

    it('should access elements within the lazy loaded component', fakeAsync(async () => {
      router.navigate(['custom']).then(() => {
        tick();
        fixture.detectChanges();
        const elementWithinLazyComponent = fixture.debugElement.query(By.directive(LazyLoadedComponent)); // Or a class, etc.
        expect(elementWithinLazyComponent).not.toBeNull();
        expect(elementWithinLazyComponent.nativeElement.textContent).toContain('custom works!'); // Example assertion
      });
    }));

    it('should handle navigation failures gracefully', fakeAsync(async () => {
      try {
        await router.navigate(['/invalid-route']);
        tick();
        fixture.detectChanges();

        fail('Should have thrown navigation error');
      } catch (error) {
        expect(error).toBeTruthy();
        expect(location.path()).toBe('');
      }
    }));
  });

  describe('Non-Lazy loaded components', () => {
    it('should create the non-lazy loaded component', fakeAsync(async () => {
      await router.navigate(['/not-lazy-loaded']);
      tick(); // Wait for lazy loading and navigation

      // Single change detection after navigation is complete
      fixture.detectChanges();
      expect(location.path()).toBe('/not-lazy-loaded');
      // Assert component is loaded correctly
      const component = fixture.debugElement.query(By.directive(NotLazyLoadedComponent));
      if (!component) {
        fail('Lazy loaded component was not created');
      }

      // Query for the custom component
      const lazyComponentDE = fixture.debugElement.query(By.directive(NotLazyLoadedComponent));
      expect(lazyComponentDE).toBeTruthy();

      // Verify component instance
      const lazyComponent = lazyComponentDE?.componentInstance;
      expect(lazyComponent).toBeTruthy();
      expect(lazyComponent instanceof NotLazyLoadedComponent).toBeTruthy();
    }));

    it('should access elements within the non-lazy loaded component', fakeAsync(async () => {
      router.navigate(['not-lazy-loaded']).then(() => {
        tick();
        fixture.detectChanges();
        const elementWithinLazyComponent = fixture.debugElement.query(By.directive(NotLazyLoadedComponent)); // Or a class, etc.
        expect(elementWithinLazyComponent).not.toBeNull();
        expect(elementWithinLazyComponent.nativeElement.textContent).toContain('not-lazy-loaded works!'); // Example assertion
      });
    }));

    it('should handle navigation failures gracefully', fakeAsync(async () => {
      try {
        await router.navigate(['/invalid-route']);
        tick();
        fixture.detectChanges();

        fail('Should have thrown navigation error');
      } catch (error) {
        expect(error).toBeTruthy();
        expect(location.path()).toBe('');
      }
    }));
  });

  describe('RouteParams components', () => {
    it('should have the correct route param id in the component', fakeAsync(async () => {
      fixture.detectChanges();
      await router.navigate(['/employees/123']);
      tick(); // Wait for lazy loading and navigation
      fixture.detectChanges();
      const paramsComponentDE = fixture.debugElement.query(By.directive(paramsIdComponent));
      expect(paramsComponentDE).toBeTruthy();
      const paramsComponentInstance = paramsComponentDE.componentInstance as paramsIdComponent;
      expect(paramsComponentInstance.paramsId).toBe('123'); // Assuming the component stores the param in a property called 'id'
    }));

    it('should access elements within the route params component', fakeAsync(async () => {
      router.navigate(['employees/120']).then(() => {
        tick();
        fixture.detectChanges();
        const elementWithinLazyComponent = fixture.debugElement.query(By.directive(paramsIdComponent)); // Or a class, etc.
        expect(elementWithinLazyComponent).not.toBeNull();
        expect(elementWithinLazyComponent.nativeElement.textContent).toContain('the employee id is 120'); // Example assertion
      });
    }));

    it('should handle navigation failures gracefully in route params component', fakeAsync(async () => {
      try {
        await router.navigate(['/employessee/120']);
        tick();
        fixture.detectChanges();

        fail('Should have thrown navigation error');
      } catch (error) {
        expect(error).toBeTruthy();
        expect(location.path()).toBe('');
      }
    }));
  });

  describe('QueryParams components', () => {
    it('should have the correct QueryParam in the component', fakeAsync(async () => {
      // fixture.detectChanges();
      const params = { id: 123, name: 'John' };
      await router.navigate(['/queryparams'], { queryParams: params });

      tick(); // Wait for lazy loading and navigation
      fixture.detectChanges();
      const paramsComponentDE = fixture.debugElement.query(By.directive(QueryparamsComponent));
      expect(paramsComponentDE).toBeTruthy();
      const paramsComponentInstance = paramsComponentDE.componentInstance as QueryparamsComponent;
      expect(paramsComponentInstance.queryParam).toEqual(JSON.stringify({ "id": "123", "name": "John" })); // Assuming the component stores the param in a property called 'id'
    }));

    it('should access elements within the QueryParams in the component', fakeAsync(async () => {
      const params = { id: 123, name: 'John' };
      await router.navigate(['/queryparams'], { queryParams: params }).then(() => {
        tick();
        fixture.detectChanges();
        const elementWithinLazyComponent = fixture.debugElement.query(By.directive(QueryparamsComponent)); // Or a class, etc.
        expect(elementWithinLazyComponent).not.toBeNull();
        expect(elementWithinLazyComponent.nativeElement.textContent).toContain('the queryparams is {"id":"123","name":"John"}'); // Example assertion
      });
    }));

    it('should handle navigation failures gracefully in route params component', fakeAsync(async () => {
      const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.reject(new Error('Navigation Error')));

      try {
        await router.navigate(['/queryparams'], { queryParams: { param: 'value' } });
        tick();
        fixture.detectChanges();
        fail('Should have thrown navigation error');
      } catch (error) {
        expect(error).toBeTruthy();
        expect(navigateSpy).toHaveBeenCalledWith(['/queryparams'], { queryParams: { param: 'value' } });
      }
    }));
  });
});