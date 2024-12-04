import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicComponent, ThemeService } from '../../projects/theme/src/public-api';

export class MyThemeService extends ThemeService {
  // 在此复写
}

@Component({
  selector: 'app-root',
  imports: [BasicComponent],
  template: `
    <theme-basic>
      <h1>hello</h1>
    </theme-basic>`,
    providers: [
      {
        provide: ThemeService, useClass: MyThemeService
      }
    ]
})
export class AppComponent {
  title = 'angular19';
}
