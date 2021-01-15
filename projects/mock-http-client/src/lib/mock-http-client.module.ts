import {ModuleWithProviders, NgModule, Provider, Type} from '@angular/core';
import {MockObservable} from './mock-observable';
import {MockHttpClientService} from './mock-http-client.service';
import {HttpClient} from '@angular/common/http';
import {MockHttpClient} from './mock-http-client';
import {MockLoadingService} from './mock-loading.service';
import {MockLoadingInterface} from './mock-loading.interface';

@NgModule({
  providers: [
    MockLoadingService,
    MockObservable,
    MockHttpClientService,
    {provide: HttpClient, useClass: MockHttpClient}
  ]
})
export class MockHttpClientModule {
  static forRoot(config: {
    loadingService?: Type<MockLoadingInterface>
  }): ModuleWithProviders<MockHttpClientModule> {
    const providers = new Array<Provider>();
    if (config.loadingService) {
      providers.push({provide: MockLoadingService, useExisting: config.loadingService});
    }

    return {
      ngModule: MockHttpClientModule,
      providers
    };
  }
}
