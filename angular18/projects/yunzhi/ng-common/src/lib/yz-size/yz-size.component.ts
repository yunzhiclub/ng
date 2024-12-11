import {CommonModule} from '@angular/common';
import {Component, effect, input, OnInit, output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'yz-size',
  templateUrl: './yz-size.component.html',
  styleUrls: ['./yz-size.component.scss'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class YzSizeComponent implements OnInit {
  sizes = input([10, 20, 50]);

  size = input(20);

  sizeControl = new FormControl<number>(this.size());

  /**
   * 此方法将在 >19 的版本中移除
   * @Deprecated
   * 请使用 beChange
   */
  changeSize = output<number>();

  beChange = output<number>();

  constructor() {
    effect(() => {
      this.sizeControl.setValue(this.size());
    });
  }

  ngOnInit(): void {
    this.sizeControl.valueChanges.subscribe(size => {
      this.changeSize.emit(size as number);
      this.beChange.emit(size as number);
    });
  }
}
