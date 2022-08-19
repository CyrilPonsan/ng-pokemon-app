import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmnBorderCard]",
})
export class BorderCardDirective {
  //  alias
  @Input("pkmnBorderCard") borderColor!: string;

  //  sans alias : @Input() pkmnBorderCard!: string;

  initialColor: string = "#f5f5f5";
  defaultColor: string = "#009688";
  defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
    this.setCursorPointer();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColor);
    this.setCursorNormal();
  }

  private setHeight(height: number): void {
    this.el.nativeElement.style.height = `${this.defaultHeight}px`;
  }

  private setBorder(color: string): void {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  private setCursorPointer(): void {
    this.el.nativeElement.style.cursor = "pointer";
  }

  private setCursorNormal(): void {
    this.el.nativeElement.style.cursor = "normal";
  }
}
