import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'add-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private headerService: HeaderService) {}

    ngOnInit(): void {}

    get title() {
        return this.headerService.headerData.title;
    }

    get icon() {
        return this.headerService.headerData.icon;
    }

    get url() {
        return this.headerService.headerData.url;
    }

}