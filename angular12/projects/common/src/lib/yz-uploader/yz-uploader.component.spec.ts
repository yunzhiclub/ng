import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {YzModalModule} from '../yz-modal/yz-modal.module';
import {YzUploaderService} from './yz-uploader.service';

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
        YzUploaderService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YzUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  fit('多文件上传', () => {
    expect(component).toBeTruthy();
    component.multiple = true;
    fixture.autoDetectChanges();
  });

  it('progress 进度条', (done) => {
    let i = 0;
    interval(10).pipe(
      take(10)
    ).subscribe(() => {
      i++;
      component.progress = i * 10;
      component.uploading = true;
      fixture.detectChanges();
    }, () => {
    }, () => done());
  });
});
