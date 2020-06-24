import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store, select } from '@ngrx/store';

import { addItem, removeItem } from 'src/app/redux/actions';
import { Item } from 'src/app/models/item.model';
import { HeaderService } from 'src/app/services/header.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'add-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @ViewChild(MatTable) table: MatTable<Item>;
    
    public dataSource: Item[];

    displayedColumns = ['product', 'price', 'amount', 'actions', 'total'];

    constructor(store: Store<{ cart: Item[] }>, headerService: HeaderService, private cartService: CartService) {
        headerService.headerData = {
            title: 'Carrinho de Compras', icon: 'shopping_cart', url: '/cart'
        };

        store.pipe(select('cart')).subscribe(value => {
            this.dataSource = value;
        })
    }

    public remove(item: Item): void {
        this.cartService.remove(item, 1);
    }

    public total() {
        return this.cartService.total(this.dataSource);
    }

    ngOnInit(): void {}

}