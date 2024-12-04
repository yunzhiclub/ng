import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {interval, Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';
import {YzUploaderService} from './yz-uploader.service';
import {Component} from '@angular/core';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    YzUploaderComponent,
    CommonModule
  ],
  providers: [
    {provide: YzUploaderService, useClass: YzUploaderService}
  ],
  template: `
    <img [src]="src" alt="image">
    <yz-uploader *ngIf="showUploader" [multiple]="multiple"
                 [maxSize]="100"
                 accept="image/gif, image/jpeg, image/png"
                 (beUpload)="onUpload($event)"
                 (beClose)="onUploadClose()"></yz-uploader>
  `
})
class TestComponent {
  multiple = false;
  showUploader = true;
  src: any;

  onUpload($event: {file: File, response: HttpResponse<any>}) {
    YzUploaderService.readerImageFileToDataURL($event.file)
      .subscribe(url => this.src = url);
  }

  onUploadClose() {
    console.log('关闭');
  }
}

class UploadServer {
  upload(file: File): Observable<HttpEvent<any>> {
    console.log('rewrite');
    return of(null as unknown as HttpEvent<any>);
  }
}

describe('YzUploaderComponent', () => {
  let component: TestComponent;
  let upLoaderComponent: YzUploaderComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestComponent,
        FormsModule,
        ReactiveFormsModule
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('多文件上传', () => {
    expect(component).toBeTruthy();
    component.multiple = true;
    fixture.autoDetectChanges();
  });

  it('progress 进度条', (done) => {
    fixture.detectChanges();
    upLoaderComponent = fixture.debugElement.query(By.directive(YzUploaderComponent)).componentInstance;
    let i = 0;
    interval(10).pipe(
      take(10)
    ).subscribe(() => {
      i++;
      upLoaderComponent.progress = i * 10;
      upLoaderComponent.uploading = true;
      fixture.detectChanges();
    }, () => {
    }, () => done());
  });
});
