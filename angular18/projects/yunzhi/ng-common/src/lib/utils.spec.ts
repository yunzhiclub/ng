import {Utils} from './utils';
import {HttpParams} from "@angular/common/http";

describe('utils', () => {
  it('timestampToDatetimeString', () => {
    const now = new Date().getTime();
    console.log(now);
    console.log(Utils.timestampToDatetimeString(now));
  });

  it('sortsToParams', () => {
    expect(Utils.sortsToParams({})).toEqual([]);
    expect(Utils.sortsToParams({id: 'desc'})).toEqual(['id,desc']);
    expect(Utils.sortsToParams({id: undefined} as unknown as {id: 'asc'})).toEqual([]);
    expect(Utils.sortsToParams({id: 'asc'})).toEqual(['id,asc']);
    expect(Utils.sortsToParams({id: 'asc', name: 'asc'})).toEqual(['id,asc', 'name,asc']);

    // 测试非关键字
    expect(Utils.sortsToParams({id: 'ascc', name: 'asc'} as unknown as {id: 'asc'})).toEqual(['name,asc']);

    // 测试大小写
    expect(Utils.sortsToParams({id: 'AsC'} as unknown as {id: 'asc'})).toEqual(['id,AsC']);

    const httpParam = new HttpParams().appendAll({sort: Utils.sortsToParams({id: 'asc', name: 'desc'})});
    const sorts = httpParam.getAll('sort');
    expect(sorts?.length).toBe(2);
    expect(sorts).toEqual(['id,asc', 'name,desc']);

    // 测试关键字
    expect(Utils.sortsToParams({id: 'asc', name: 'asc'})).toEqual(['id,asc', 'name,asc']);
  });
});
