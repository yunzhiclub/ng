import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YzModalModule} from '../yz-modal/yz-modal.module';
import {YzUploaderService} from './yz-uploader.service';

@NgModule({
  declarations: [YzUploaderComponent],
  exports: [
    YzUploaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    YzModalModule
  ],
  providers: [
    // 启用以下代码将导致forRoot()中配置的注入失效
    // YzUploaderService
  ]
})
export class YzUploaderModule {
  public static forRoot(config: {
    uploaderService: Type<YzUploaderService>
  }): ModuleWithProviders<YzUploaderModule> {
    return {
      providers: [
        {provide: YzUploaderService, useClass: config.uploaderService}
      ],
      ngModule: YzUploaderModule
    };
  }
}
