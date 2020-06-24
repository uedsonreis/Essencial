import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addItem, removeItem } from '../redux/actions';
import { Item } from '../models/item.model';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private store: Store<{ cart: Item[] }>) {}

    public add(product: Product, amount: number): void {
        const item: Item = { product, amount };
        this.store.dispatch(addItem(item));
    }

    public remove(item: Item, amount: number): void {
        if (item.amount > amount) {
            this.store.dispatch(addItem({ product: item.product, amount: -amount }));
        } else {
            this.store.dispatch(removeItem({ product: item.product, amount: undefined }));
        }
    }

    public total(items: Item[]) {
        return items.reduce(
            (total, item) => (total + item.product.price * item.amount), 0.0
        );
    }

}