import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[addRed]'
})
export class RedDirective {

    constructor(element: ElementRef) {
        element.nativeElement.style.color = "#e35e6b";
    }

}