import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MakeBlueDirective } from './makeblue.directive';

describe('MakeBlueDirective', () => {
  let directive: MakeBlueDirective;
  let elRefMock: any;
  let rendererMock: any;

  beforeEach(() => {
    elRefMock = { nativeElement: document.createElement('div') };
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle']);

    TestBed.configureTestingModule({
      providers: [
        MakeBlueDirective,
        { provide: ElementRef, useValue: elRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    directive = TestBed.inject(MakeBlueDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should change the color to blue on mouse enter', () => {
    directive.onMouseEnter();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(elRefMock.nativeElement, 'color', 'blue');
  });

  it('should remove the color style on mouse leave', () => {
    directive.onMouseLeave();
    expect(rendererMock.removeStyle).toHaveBeenCalledWith(elRefMock.nativeElement, 'color');
  });

  it('should not change color if not hovered', () => {
    expect(elRefMock.nativeElement.style.color).toBe(''); // Should be empty initially
  });

});
