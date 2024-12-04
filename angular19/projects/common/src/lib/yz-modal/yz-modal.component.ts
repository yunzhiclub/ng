import { CommonModule } from '@angular/common';
import {Component, Input} from '@angular/core';

/**
 * 弹出框
 */
@Component({
  standalone: true,
  selector: 'yz-modal',
  templateUrl: './yz-modal.component.html',
  styleUrls: ['./yz-modal.component.scss'],
  imports: [
    CommonModule
  ]
})
export class YzModalComponent {
  @Input()
  size = 'md';

  @Input()
  width = '30%';

  constructor() {
  }

}
