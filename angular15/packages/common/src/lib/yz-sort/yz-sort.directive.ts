import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewContainerRef} from '@angular/core';
import {YzSortComponent} from "./yz-sort.component";
import {Utils} from "../utils";

export type YzSorts<T> = { [key in keyof T]: 'asc' | 'desc' };
export type YzSortsAndParams<T> = {sorts: YzSorts<T>, params: ReadonlyArray<string>};

@Directive({
  selector: '[yzSort]',
  standalone: true
})
export class YzSortDirective implements OnInit {
  @Input() yzSort!: string;
  @Input() yzSorts!: YzSorts<any>;
  @Output()
  beYzSortChange = new EventEmitter<YzSortsAndParams<any>>();

  constructor(private viewContainerRef: ViewContainerRef,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const sortComponentRef = this.viewContainerRef.createComponent(YzSortComponent);
    sortComponentRef.instance.key = this.yzSort;
    sortComponentRef.instance.sorts = this.yzSorts;
    sortComponentRef.instance.beChange.asObservable().subscribe(v => this.beYzSortChange.emit({
      sorts: v,
      params: Utils.sortsToParams(v)
    }));
    const sortNative = sortComponentRef.location.nativeElement;
    this.renderer.appendChild(this.elementRef.nativeElement, sortNative);
  }
}

