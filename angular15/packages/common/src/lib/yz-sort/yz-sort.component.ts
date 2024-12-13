import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {YzSorts} from "./yz-sort.directive";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './yz-sort.component.html',
  styles: `span {
    padding-left: 0.25em;
    padding-right: 0.25em;
  }`,
  imports: [
    CommonModule
  ]
})
export class YzSortComponent {

  @Input()
  key!: string;

  @Input()
  sorts = {} as YzSorts<any>;

  @Output()
  beChange = new EventEmitter<YzSorts<any>>;

  getSort(): 'asc' | 'desc' | undefined | null {
    return this.sorts[this.key];
  }

  onClick() {
    const sort = this.sorts[this.key];
    let result;
    switch (sort) {
      case 'asc':
        result = 'desc';
        break;
      case 'desc':
        result = undefined;
        break;
      default:
        result = 'asc';
        break;
    }
    if (typeof result === 'undefined') {
      delete this.sorts[this.key];
    } else {
      delete this.sorts[this.key];
      this.sorts[this.key] = result as 'asc' | 'desc';
    }

    this.beChange.emit(this.sorts);
  }
}
