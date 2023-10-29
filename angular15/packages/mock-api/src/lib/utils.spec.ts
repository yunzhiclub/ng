import {TestBed} from '@angular/core/testing';

import {convertToLoadingFormat, getDefaultWhenValueIsInValid} from './utils';


describe('utils', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: []
  }));

  it('convertToLoadingFormat', () => {
    expect(convertToLoadingFormat('请稍候')).toEqual('请稍候.');
    expect(convertToLoadingFormat('请稍候.')).toEqual('请稍候..');
    expect(convertToLoadingFormat('请稍候..')).toEqual('请稍候...');
    expect(convertToLoadingFormat('请稍候...')).toEqual('请稍候');
  });

  it('getDefaultWhenValueIsInValid', () => {
    const a = undefined as unknown as number;
    // NaN
    expect(getDefaultWhenValueIsInValid(+a, 0)).toBe(0);
  });
});
