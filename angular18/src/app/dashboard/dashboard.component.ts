import {Component, signal} from '@angular/core';
import {BasicComponent} from "../../../projects/yunzhi/ng-theme/src/lib/basic.component";
import {YzPageComponent} from "../../../projects/yunzhi/ng-common/src/lib/yz-page/yz-page.component";
import {YzSizeComponent} from "../../../projects/yunzhi/ng-common/src/lib/yz-size/yz-size.component";
import {YzUploaderComponent} from "../../../projects/yunzhi/ng-common/src/lib/yz-uploader/yz-uploader.component";
import {
  YzSortDirective,
  YzSorts,
  YzSortsAndParams
} from "../../../projects/yunzhi/ng-common/src/lib/yz-sort/yz-sort.directive";
import {HttpClient, HttpParams} from "@angular/common/http";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

interface User {
  id: number,
  name: string,
  username: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    YzPageComponent,
    YzSizeComponent,
    YzUploaderComponent,
    YzSortDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private httpClient: HttpClient) {
  }

  onUploaderClose() {
    this.showUploader.set(false);
  }

  onSortChange(sorts: YzSortsAndParams<User>) {
    this.sorts = sorts.sorts;
    console.log(this.sorts);
    const httpParams = new HttpParams().appendAll({sort: sorts.params});
    this.httpClient.get('test', {params: httpParams}).subscribe();
  }

  onUploaded() {
    this.showUploader.set(false);
  }

  onToggleShowUploader() {
    this.showUploader.update(v => !v);
  }

  showUploader = signal(false);
  page = 0;

  sorts = {id: 'desc'} as YzSorts<User>;

  onPageChange(page: number) {
    this.page = page;
    of(null).pipe(delay(500)).subscribe(() => {
    });
  }

  onSizeChange(size: number): void {
    console.log('size change', size);
  }

}
