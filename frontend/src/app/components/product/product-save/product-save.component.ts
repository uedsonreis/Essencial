import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'add-product-save',
    templateUrl: './product-save.component.html',
    styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {

    public product: Product = { name: '', price: null };
    public pageTitle: string = "Novo Produto";

    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.productService.get(id).subscribe(product => this.product = product);
            this.pageTitle = "Alterar Produto";
        }
    }

    public isValid(): boolean {
        const { name, price } = this.product;
        if (!name || name === null || name.trim() === '') return false;
        if (!price || price === null) return false;
        return true;
    }

    public save(): void {
        if (this.product.id) {
            this.productService.update(this.product).subscribe(product => {
                this.productService.showMessage("Produto atualizado com sucesso!");
                this.router.navigate(['/products']);
            });
        } else {
            this.productService.create(this.product).subscribe(product => {
                this.productService.showMessage("Produto salvo com ID: " + product.id);
                this.router.navigate(['/products']);
            });
        }
    }

    public cancel(): void {
        this.router.navigate(['/products']);
    }

}