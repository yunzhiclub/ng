import {Component} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  /**
   * 当前是否为默认密码
   */
  default = false;

  constructor() {
  }

  /**
   * 关闭提示信息
   */
  closeToast(): void {
    this.default = false;
  }
}
