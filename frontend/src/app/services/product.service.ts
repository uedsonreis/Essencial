import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly baseUrl: string = "http://localhost:3001/products";

    private config: MatSnackBarConfig<any> = {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
    };

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    showMessage(msg: string): void {
        this.snackBar.open(msg, 'Fechar', this.config);
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product);
    }

}