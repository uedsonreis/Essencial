import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { addItem } from '../../../redux/actions';

import { ProductListDataSource } from './product-list-datasource';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'add-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<Product>;
    
    public dataSource: ProductListDataSource;

    displayedColumns = ['id', 'name', 'price', 'actions'];

    constructor(private productService: ProductService, private cartService: CartService) {}

    ngOnInit() {
        this.productService.list().subscribe(products => {
            this.dataSource = new ProductListDataSource(products);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    public addToCart(product: Product) {
        this.cartService.add(product, 1);
    }

}