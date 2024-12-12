import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef} from '@angular/core';
import {YzSortComponent, YzSorts} from "./yz-sort.component";

@Directive({
  selector: '[yzSort]',
  standalone: true
})
export class YzSortDirective implements OnInit {
  @Input() yzSort!: string;
  @Input() yzSorts!: YzSorts<any>;
  @Output()
  beYzSortChange = new EventEmitter<YzSorts<any>>();

  constructor(private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const sortComponentRef = this.viewContainerRef.createComponent(YzSortComponent);
    sortComponentRef.instance.key = this.yzSort;
    sortComponentRef.instance.sorts = this.yzSorts;
    sortComponentRef.instance.beChange.asObservable().subscribe(v => this.beYzSortChange.emit(v));
    const sortNative = sortComponentRef.location.nativeElement;
    this.renderer.appendChild(this.elementRef.nativeElement, sortNative);
  }
}

