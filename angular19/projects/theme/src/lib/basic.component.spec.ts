import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicComponent} from './basic.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {firstValueFrom, of} from 'rxjs';
import {ThemeService} from './service/theme.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div>
    <theme-basic #child></theme-basic>
  </div>
  `,
  imports: [BasicComponent]
})
class TestComponent {
  @ViewChild('child')
  menuComponent: BasicComponent | undefined;
}

describe('BasicComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestComponent,
        RouterTestingModule,
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl')
      .and.returnValue(firstValueFrom(of(true)));
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
