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
  ]
})
export class YzUploaderModule {
  public static forRoot(config: {
    uploaderService: Type<YzUploaderService>
  }): ModuleWithProviders<YzUploaderModule> {
    return {
      ngModule: YzUploaderModule,
      providers: [
        {provide: YzUploaderService, useClass: config.uploaderService}
      ]
    }
  }
}
