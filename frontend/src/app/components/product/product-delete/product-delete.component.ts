import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'add-product-delete',
    templateUrl: './product-delete.component.html',
    styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

    public product: Product = { name: '', price: null };
    
    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.get(id).subscribe(product => this.product = product);
    }

    public delete(): void {
        this.productService.delete(this.product.id).subscribe(product => {
            this.productService.showMessage("Produto deletado com sucesso!");
            this.router.navigate(['/products']);
        });
    }

    public cancel(): void {
        this.router.navigate(['/products']);
    }

}
