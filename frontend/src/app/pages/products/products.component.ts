import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'add-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit(): void {}

    navigateToProductCreate() {
        this.router.navigate(['/products/create']);
    }

}