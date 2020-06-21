import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'add-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(headerService: HeaderService) {
        headerService.headerData = {
            title: 'Início', icon: 'home', url: '/'
        };
    }

    ngOnInit(): void {}

}