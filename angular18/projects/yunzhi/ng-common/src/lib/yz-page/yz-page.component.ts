import {CommonModule} from '@angular/common';
import {Component, computed, effect, input, OnInit, output} from '@angular/core';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  standalone: true,
  selector: 'yz-page',
  templateUrl: './yz-page.component.html',
  styleUrls: ['./yz-page.component.scss'],
  imports: [
    CommonModule
  ]
})
export class YzPageComponent implements OnInit {
  /**
   * @Deprecated
   * 本组件引自 yunzhiclub/platform 项目
   * https://github.com/yunzhiclub/platform/blob/master/src/app/share/component/paginator/paginator.component.ts
   */
  changePage = output<number>();

  beChange = output<number>();

  totalElements = input(0);

  page = input<number>(0);

  size = input(20);

  pageLinkSize = input(7);

  clicking = false;

  constructor() {
    effect(() => {
      if (typeof this.page() === 'number') {
        this.clicking = false;
      }
    });
  }

  ngOnInit(): void {
  }

  // 生成分页范围
  paginatorRange = computed<number[]>(() => {
    const result = [] as number[];
    const range = this.getStartAndEnd();
    for (let i = range.start; i <= range.end; i++) {
      result.push(i);
    }
    return result;
  });

  totalPage = computed((): number => {
    return Math.ceil(this.totalElements() / this.size());
  });

  // 计算开始和结束的分页下标
  getStartAndEnd = computed((): {start: number, end: number} => {
    const visiblePages = Math.min(this.totalPage(), this.pageLinkSize());  // 计算可显示的页数
    let start = Math.max(0, this.page() - Math.floor(visiblePages / 2)); // 从0开始或从中间值开始
    let end = Math.min(this.totalPage() - 1, Math.ceil(start + visiblePages - 1)); // 最大页数或起始页加上可显示的页数
    if (end < 0) {
      end = 0;
    }
    // 保证间隔为可显示页数
    const interval = this.pageLinkSize() - (end - start + 1);
    start = Math.max(0, start - interval);

    /** 当前页超过最大页码时取最后一页 */
    if (isNotNullOrUndefined(this.page()) && this.page() > end) {
      this.changePage.emit(end);
      this.beChange.emit(end);
    }
    return {start, end};
  });

  onChange(page: number, active?: boolean): void {
    if (active) {
      return;
    }
    if (page < 0) {
      page = 0;
    } else if (page >= this.totalPage()) {
      page = this.totalPage() - 1;
    }
    if (!this.clicking) {
      this.clicking = true;
      of(null).pipe(delay(500)).subscribe(() => this.clicking = false);
      this.changePage.emit(page);
      this.beChange.emit(page);
    }
  }
}
