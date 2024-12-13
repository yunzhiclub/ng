# ng common
version 18.x.x for angular 18.x.x.

`npm install -i @yunzhi/ng-common`

## 使用方法 How to use

### 排序指令 yz-sort

example

```ts
interface User {
  id: number,
  name: string,
  username: string;
}

@Component({
  standalone: true,
  imports: [YzSortDirective],
  template: `
      <table class="table">
        <tr>
          <th>序号</th>
          <th [yzSort]="'id'" [yzSorts]="sorts" (beYzSortChange)="onSortChange($event)">ID</th>
          <th [yzSort]="'name'" [yzSorts]="sorts" (beYzSortChange)="onSortChange($event)">name</th>
          <th>username</th>
        </tr>
      </table>
    `,
})
export class TestComponent {
  sorts = {id: 'desc'} as YzSorts<User>;
  onSortChange(sorts: YzSortsAndParams<User>) {
    this.sorts = sorts.sorts;
    console.log(this.sorts);
    const httpParams = new HttpParams().appendAll({sort: sorts.params});
    this.httpClient.get('test', {params: httpParams}).subscribe();
  }
}
```

1. click id: sorts -> `{}`, network -> `test`
2. click id: sorts -> `{id: 'asc'}`, `test?sort=id,asc`
3. click id: sorts -> `{id: 'desc'}`, `test?sort=id,desc`
4. click id: sorts -> `{}`, network -> `test`
5. click id: sorts -> `{id: 'asc'}`, `test?sort=id,asc`
6. click name: sorts -> `{id: 'asc', name: 'asc'}`, `test?sort=name,asc&sort=id,asc`
7. click name: sorts -> `{id: 'asc', name: 'desc'}`, `test?sort=name,desc&sort=id,asc`
8. click name: sorts -> `{id: 'asc'}`, `test?sort=id,asc`
9. click name: sorts -> `{id: 'asc', name: 'asc'}`, `test?sort=name,asc&sort=id,asc`
10. click id: sorts -> `{name: 'asc', id: 'desc'}`, network -> `test?sort=id,desc&sort=name,asc`
