import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'yz-size',
  templateUrl: './yz-size.component.html',
  styleUrls: ['./yz-size.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class YzSizeComponent {
  @Input()
  sizes = [10, 20, 50];

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
