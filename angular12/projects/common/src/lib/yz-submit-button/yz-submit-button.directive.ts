import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

/**
 * 使用方法
 *  <button [yzSubmitButton]="{submitting: true}">
 * .....
 *  </button>
 *
 *  submitting 默认值应为 false
 *  方法开始执行设置    submitting= true
 *  方法调用完成以后设置 submitting = false
 *
 */
@Directive({
  selector: 'button[yzSubmitButton]'
})
export class YzSubmitButtonDirective implements AfterViewInit {
  private static loadingClazz = 'fas fa-cog fa-spin';
  htmlButton: HTMLButtonElement;
  showing = false;
  submittingCount = 0;
  private cacheClassName: string | null;

  constructor(el: ElementRef) {
    this.htmlButton = el.nativeElement;

  }

  /**
   * 指令初始化
   * @param submitting: 是否正在提交中
   */
  @Input()
  public set yzSubmitButton(submitting: boolean) {
    if (submitting) {
      this.submittingCount++;
    } else {
      this.submittingCount = this.submittingCount === 0 ? 0 : this.submittingCount - 1;
    }

    this.showLoading(this.submittingCount);
  }

  showLoading(submittingCount: number) {
    const iHtml = this.htmlButton.querySelector('i');

    if (submittingCount > 0 && !this.showing) {
      this.showing = true;
      this.htmlButton.disabled = true;
      if (iHtml) {
        this.cacheClassName = iHtml.classList.value;
        iHtml.className = YzSubmitButtonDirective.loadingClazz;
      }
    } else if (submittingCount === 0 && this.showing) {
      this.showing = false;
      setTimeout(() => {
        if (!this.showing) {
          this.htmlButton.disabled = false;
          if (iHtml) {
            iHtml.className = this.cacheClassName;
          }
        }
      }, 500)
    }
  }

  ngAfterViewInit(): void {
    this.showLoading(this.submittingCount);
  }
}
