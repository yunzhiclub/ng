import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'yz-size',
  templateUrl: './yz-size.component.html',
  styleUrls: ['./yz-size.component.scss']
})
export class YzSizeComponent {

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
