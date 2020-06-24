import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { HeaderService } from 'src/app/services/header.service';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'add-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    constructor(private router: Router, headerService: HeaderService) {
        headerService.headerData = {
            title: 'Cadastro de Produtos', icon: 'list', url: '/products'
        };
    }

    ngOnInit(): void {}

    navigateToProductCreate() {
        this.router.navigate(['/products/create']);
    }

}