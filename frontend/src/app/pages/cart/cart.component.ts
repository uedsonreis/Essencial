import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store, select } from '@ngrx/store';

import { addItem, removeItem } from 'src/app/redux/actions';
import { Item } from 'src/app/models/item.model';

@Component({
    selector: 'add-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @ViewChild(MatTable) table: MatTable<Item>;
    
    public dataSource: Item[];

    displayedColumns = ['product', 'price', 'amount', 'actions', 'total'];

    constructor(private store: Store<{ cart: Item[] }>) {
        this.store.pipe(select('cart')).subscribe(value => {
            this.dataSource = value;
        })
    }

    public remove(item: Item): void {
        if (item.amount > 1) {
            this.store.dispatch(addItem({ product: item.product, amount: -1 }));
        } else {
            this.store.dispatch(removeItem({ product: item.product, amount: 0 }));
        }
    }

    public total() {
        return this.dataSource.reduce(
            (total, item) => (total + item.product.price * item.amount), 0.0
        );
    }

    ngOnInit(): void {}

}