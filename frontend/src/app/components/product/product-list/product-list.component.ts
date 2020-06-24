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

    constructor(private productService: ProductService, private store: Store) {}

    ngOnInit() {
        this.productService.list().subscribe(products => {
            this.dataSource = new ProductListDataSource(products);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    public addToCart(product: Product) {
        const item: Item = { product, amount: 1 };
        this.store.dispatch(addItem(item));
    }

}