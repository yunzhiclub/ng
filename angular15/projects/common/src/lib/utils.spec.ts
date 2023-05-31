import {Utils} from './utils';

describe('utils', () => {
  it('timestampToDatetimeString', () => {
    const now = new Date().getTime();
    console.log(now);
    console.log(Utils.timestampToDatetimeString(now));
  });
});
