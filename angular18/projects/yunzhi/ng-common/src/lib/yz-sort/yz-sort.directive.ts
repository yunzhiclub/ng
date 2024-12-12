import {Directive, ElementRef, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {YzSortComponent} from "./yz-sort.component";

@Directive({
  selector: '[yzSort]',
  standalone: true
})
export class YzSortDirective implements OnInit {

  // @Input({required: true})
  // yzSort
  constructor(private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const sortComponentRef = this.viewContainerRef.createComponent(YzSortComponent);
    const sortNative = sortComponentRef.location.nativeElement;
    this.renderer.appendChild(this.elementRef.nativeElement, sortNative);
  }
}

