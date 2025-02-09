import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    // Arrange
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    // Act
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    // Assert
    expect(result).toBeTrue();
  });

  it('should navigate to login if user is not authenticated and return false', () => {
    // Arrange
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    // Act
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    // Assert
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});

