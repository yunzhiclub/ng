import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzUploaderComponent} from './yz-uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YzModalModule} from '../yz-modal/yz-modal.module';
import {AttachmentService} from '../attachment.service';


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
  ]
})
export class YzUploaderModule {
  public static forRoot(config: {
    attachmentService: Type<AttachmentService>
  }): ModuleWithProviders<YzUploaderModule> {
    return {
      ngModule: YzUploaderModule,
      providers: [
        {provide: AttachmentService, useClass: config.attachmentService}
      ]
    }
  }
}
