import {Component, computed, effect, HostListener, input, output, signal} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {concat} from 'rxjs';
import {YzUploaderService} from './yz-uploader.service';
import {Utils} from '@yunzhi/utils';
import {delay} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {YzModalComponent} from '../yz-modal/yz-modal.component';

/**
 * 上传组件
 * 参考：https://github.com/NetanelBasal/ng-file-uploa
 */
@Component({
  standalone: true,
  selector: 'yz-uploader',
  templateUrl: './yz-uploader.component.html',
  styleUrls: ['./yz-uploader.component.scss'],
  imports: [CommonModule, YzModalComponent]
})
export class YzUploaderComponent {
  /**
   * 文件过滤器
   * @param file 文件
   */
  fileFilter = input((file: File) => true);
  /**
   * 允许上传的文件类型，同<input type="file" accept="image/png, image/jpeg" />
   */
  accept = input('');
  beClose = output<void>();
  beUpload = output<{file: File, response: HttpResponse<any>}>();

  error = signal('');
  fileList: Array<File> = [];
  finishedTask = 0; // 已成功完成上传的任务
  progress = 0;
  showError = false;
  /**
   * 上传附件最大值
   * 是否上传多个文件
   */
  maxSize = input(10 * 1024 * 1024);
  multiple = input(false);
  info = computed(() => {
    return '大小限制：' + Utils.fileSize(this.maxSize());
  })

  uploading = false;

  constructor(private yzUploaderService: YzUploaderService) {
    effect(() => {
      if (this.multiple() || true) {
        this.fileList = [];
      }
    });
  }

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList): void {
    this.progress = 0;
    const files = [] as File[];
    for (let i = 0; i < event.length; i++) {
      if (event.item(i)) {
        files.push(event.item(i)!);
      }
    }

    // 过滤文件
    this.fileList = files.filter(file => {
      if (typeof this.maxSize() !== 'undefined') {
        if (file.size > this.maxSize()) {
          this.errorAppear('文件超出大小');
          return false;
        }
      }
      return this.fileFilter()(file);
    });
  }

  errorAppear(message: string): void {
    if (!this.showError) {
      this.showError = true;
      this.error.set(message);
      of(null).pipe(delay(3000)).subscribe(() => {
        this.showError = false;
      });
    }
  }

  onRemoveFile(file: File): void {
    this.fileList = this.fileList.filter(f => f !== file);
  }

  onSubmit(): void {
    if (this.fileList.length) {
      this.setProgress(0);
      this.uploading = true;
      this.finishedTask = 0;

      let task: Observable<HttpEvent<object>> = this.yzUploaderService.upload(this.fileList[0]);
      for (let i = 1; i < this.fileList.length; i++) {
        task = concat(task, this.yzUploaderService.upload(this.fileList[i]));
      }
      task.subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          if (data.total) {
            const progress = Math.round(100 * data.loaded / data.total);
            // 计算总上传进度
            this.setProgress(progress);
          }
        } else if (data.type === HttpEventType.Response) {
          this.beUpload.emit({file: this.fileList[this.finishedTask], response: data});
          if (this.finishedTask + 1 === this.fileList.length) {
            this.uploading = false;
            this.fileList = [];
          } else {
            this.setProgress(0);
            this.finishedTask++;
          }
        }
      });
    }
  }

  onClose(): void {
    this.beClose.emit();
  }


  setProgress(num: number): void {
    this.progress = Number(num.toFixed(2));
  }
}
