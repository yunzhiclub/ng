import {CommonModule} from '@angular/common';
import {Component, input, Input} from '@angular/core';

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
  size = input('md');

  width = input('30%');

  constructor() {
  }

}
