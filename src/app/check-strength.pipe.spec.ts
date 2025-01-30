import { CheckStrengthPipe } from './check-strength.pipe';

describe('CheckStrengthPipe', () => {
  let pipe: CheckStrengthPipe;
  beforeEach(() => {
    pipe = new CheckStrengthPipe();
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should check if the value is weak', () => {
    expect(pipe.transform(5)).toEqual('5(weak)');
  })
  it('should check if the value is strong', () => {
    expect(pipe.transform(15)).toEqual('15(strong)');
  })
  it('should check if the value is strongest', () => {
    expect(pipe.transform(21)).toEqual('21(strongest)');
  })
});
