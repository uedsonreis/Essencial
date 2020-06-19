import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'add-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    private product: Product = { name: 'Televisão', price: 124.99 };

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit(): void {}

    create(): void {
        this.productService.create(this.product).subscribe((product: Product) => {
            this.productService.showMessage("Produto salvo com ID: "+ product.id);
            this.router.navigate(['/products']);
        });
    }

    cancel(): void {
        this.router.navigate(['/products']);
    }

}