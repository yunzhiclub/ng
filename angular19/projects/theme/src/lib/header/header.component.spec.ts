import { TestBed} from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../service/theme.service';

@Component({
  standalone: true,
  template: '<theme-header #child></theme-header>',
  imports: [HeaderComponent],
  providers: [
    {provide: ThemeService}
  ]
})
class TestComponent {
  @ViewChild('child')
  headerComponent: HeaderComponent | undefined;
}

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      teardown: {
        destroyAfterEach: false
      }
    }).compileComponents();
  });

  it('should create', () => {
    let fixture = TestBed.createComponent(TestComponent);
    let testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent.headerComponent?.currentUser?.name).toBe('张三');
  });
});
