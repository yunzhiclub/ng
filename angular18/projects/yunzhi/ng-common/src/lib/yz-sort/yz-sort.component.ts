import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

export type YzSorts = { [key in string]: 'asc' | 'desc' | undefined | null };

@Component({
  standalone: true,
  templateUrl: './yz-sort.component.html',
  styles: `span {
    margin-left: 0.25em;
  }`,
  imports: [
    CommonModule
  ]
})
export class YzSortComponent {
  @Input()
  key!: string;

  @Input()
  sorts!: YzSorts;

  @Output()
  beChange = new EventEmitter<YzSorts>;

  getSort(): 'asc' | 'desc' | undefined | null {
    return this.sorts[this.key];
  }

  onClick() {
    const sort = this.sorts[this.key];
    let result = undefined as undefined | 'asc' | 'desc';
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
    this.sorts[this.key] = result;
    console.log(this.sorts);
    this.beChange.emit(this.sorts);
  }
}
