import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly apiUrl: string = "http://localhost:3001/products";

    private readonly config: MatSnackBarConfig<any> = {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
    };

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    public showMessage(msg: string, isError: boolean = false): void {
        this.config.panelClass = isError ? ['msg-error'] : ['msg-success'];
        this.snackBar.open(msg, '', this.config);
    }

    private handleError(error: any): Observable<any> {
        this.showMessage('Ocorreu um erro ao tentar acessar o servidor: '+error.message, true);
        return EMPTY;
    }

    public list(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map((obj: any) => obj),
            catchError((e: any) => this.handleError(e))
        );
    }

    public get(id: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + '/' + id).pipe(
            map((obj: any) => obj),
            catchError((e: any) => this.handleError(e))
        );
    }

    public create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product).pipe(
            map((obj: any) => obj),
            catchError((e: any) => this.handleError(e))
        );
    }

    public update(product: Product): Observable<Product> {
        return this.http.put<Product>(this.apiUrl + '/' + product.id, product).pipe(
            map((obj: any) => obj),
            catchError((e: any) => this.handleError(e))
        );
    }

    public delete(id: number): Observable<Product> {
        return this.http.delete<Product>(this.apiUrl + '/' + id).pipe(
            map((obj: any) => obj),
            catchError((e: any) => this.handleError(e))
        );
    }

}