import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
    selector: '[addFor]'
})
export class ForDirective implements OnInit {

    @Input('addForEm') numbers: number[];

    constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {}

    public ngOnInit(): void {
        for (let number of this.numbers) {
            this.container.createEmbeddedView(this.template, { $implicit: number });
        }
    }

}