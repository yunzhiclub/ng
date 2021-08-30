import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {interval, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent} from '@angular/common/http';
import {YzModalModule} from '../yz-modal/yz-modal.module';
import {randomNumber} from '@yunzhi/utils';
import {AttachmentService} from '../attachment.service';

describe('YzUploaderComponent', () => {
  let component: YzUploaderComponent;
  let fixture: ComponentFixture<YzUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YzUploaderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        YzModalModule
      ],
      providers: [
        AttachmentService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YzUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // 模拟一个上传的函数，该函数在2秒内完成上传，上传完成后返回一个空对象
    component.uploadFun = (file: File) => {
      console.log('接收到的文件为：', file);
      return new Observable<HttpEvent<object>>(subscriber => {
        let i = 0;
        const total = randomNumber(10000);
        interval(20).pipe(
          take(100),
          map(() => ++i)
        ).subscribe(data => {
          subscriber.next({
            type: HttpEventType.UploadProgress,
            loaded: data * total / 100,
            total
          } as HttpUploadProgressEvent);
          if (data === 100) {
            subscriber.next({
              type: HttpEventType.Response,
              body: {}
            } as HttpResponse<object>);
            subscriber.complete();
          }
        });
      });
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('progress 进度条', (done) => {
    let i = 0;
    interval(10).pipe(
      take(10)
    ).subscribe(data => {
      i++;
      component.progress = i * 10;
      component.uploading = true;
      fixture.detectChanges();
    }, () => {
    }, () => done());
  });
});
