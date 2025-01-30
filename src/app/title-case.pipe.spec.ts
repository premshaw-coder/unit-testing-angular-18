import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  let pipe = new TitleCasePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms "prem shaw" to "Prem Shaw"', () => {
    expect(pipe.transform('prem shaw')).toBe('Prem Shaw');
  });
  it('should transform empty string to empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should not transform any numeric values', () => {
    expect(pipe.transform('123')).toBe('123');
  });
});
