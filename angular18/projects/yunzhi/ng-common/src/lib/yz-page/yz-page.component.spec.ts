import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {YzPageComponent} from './yz-page.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {getTestScheduler} from "jasmine-marbles";

@Component({
  standalone: true,
  template: `
    <yz-page [totalElements]="totalElements" [pageLinkSize]="5" [page]="page"
             (changePage)="onPageChange($event)"></yz-page>`,
  imports: [YzPageComponent],
  styles: `
    :host ::ng-deep .active > a {
      color: red
    }

    :host ::ng-deep .disabled > a {
      font-size: 2em
    }
  `
})
class TestComponent {
  @ViewChild(YzPageComponent)
  pageComponent: YzPageComponent | undefined;

  page = 0;
  totalElements = 200;

  public onPageChange(page: number) {
    setTimeout(() => {
      // mock request
      this.page = page;
    }, 500)
  }
}


describe('PageComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('[1] 2 3 4', () => {
    component.totalElements = 73;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(4);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(0);
    expect(component.pageComponent!.paginatorRange()[3]).toBe(3);
    expect(component.pageComponent!.totalPage()).toBe(4);
    expect(component.pageComponent!.page()).toBe(0);
  });

  it('[1] 2 3 4 5', () => {
    component.totalElements = 83;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(0);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(4);
    expect(component.pageComponent!.totalPage()).toBe(5);
    expect(component.pageComponent!.page()).toBe(0);
  });

  it('1 2 [3] 4 5', () => {
    component.totalElements = 103;
    component.page = 2;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(0);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(4);
    expect(component.pageComponent!.totalPage()).toBe(6);
    expect(component.pageComponent!.page()).toBe(2);
  });

  it('1 2 3 [4] 5', () => {
    component.totalElements = 83;
    component.page = 3;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(0);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(4);
    expect(component.pageComponent!.totalPage()).toBe(5);
    expect(component.pageComponent!.page()).toBe(3);
  });

  it('1 2 3 4 [5]', () => {
    component.totalElements = 83;
    component.page = 4;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(0);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(4);
    expect(component.pageComponent!.totalPage()).toBe(5);
    expect(component.pageComponent!.page()).toBe(4);
  });

  it(`2 3 4 [5] 6`, () => {
    component.totalElements = 20 * 6 - 3;
    component.page = 4;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(1);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(5);
    expect(component.pageComponent!.totalPage()).toBe(6);
    expect(component.pageComponent!.page()).toBe(4);
  });

  it(`2 3 [4] 5 6`, () => {
    component.totalElements = 20 * 6 - 3;
    component.page = 3;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(1);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(5);
    expect(component.pageComponent!.totalPage()).toBe(6);
    expect(component.pageComponent!.page()).toBe(3);
  });

  it(`6 7 [8] 9 10`, () => {
    component.totalElements = 20 * 10 - 3;
    component.page = 7;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(5);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(9);
    expect(component.pageComponent!.totalPage()).toBe(10);
    expect(component.pageComponent!.page()).toBe(7);
  });

  it(`6 7 8 9 [10]`, () => {
    component.totalElements = 20 * 10 - 3;
    component.page = 9;
    fixture.detectChanges();
    expect(component.pageComponent!.paginatorRange().length).toBe(5);
    expect(component.pageComponent!.paginatorRange()[0]).toBe(5);
    expect(component.pageComponent!.paginatorRange()[4]).toBe(9);
    expect(component.pageComponent!.totalPage()).toBe(10);
    expect(component.pageComponent!.page()).toBe(9);
  });

  it('当前页超出最大页数', () => {
    spyOn(component, 'onPageChange');
    component.totalElements = 20 * 10 - 3;
    component.page = 20;
    fixture.detectChanges();
    expect(component.onPageChange).toHaveBeenCalledWith(9);
  });
});
