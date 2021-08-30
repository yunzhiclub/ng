import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent {

  @Input()
  size = 20;

  @Output()
  changeSize: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  sizeChange(size: number): void {
    this.changeSize.emit(size);
  }
}
