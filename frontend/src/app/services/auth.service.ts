import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { updateUser, logout } from '../redux/actions';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    private readonly apiUrl: string = "http://localhost:3001/users";
    private loggedUser: User;

    private readonly config: MatSnackBarConfig<any> = {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
    };

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private router: Router,
        private store: Store<{ user: User }>
    ) {
        store.pipe(select('user')).subscribe(user => this.loggedUser = user);
    }

    public showMessage(msg: string, isError: boolean = false): void {
        this.config.panelClass = isError ? ['msg-error'] : ['msg-success'];
        this.snackBar.open(msg, '', this.config);
    }

    private handleError(error: any): Observable<any> {
        this.showMessage('Ocorreu um erro ao tentar acessar o servidor: '+error.message, true);
        return EMPTY;
    }

    public login(user: User): Observable<Boolean> {
        return this.http.get<User[]>(this.apiUrl + '?username=' + user.username).pipe(
            map((users: User[]) => this.doLogin(user, users)),
            catchError((e: any) => this.handleError(e))
        );
    }

    private doLogin(user: User, users: User[]): boolean {
        if (users && users.length > 0) {
            const validUser = users.find(u => u.password === user.password);
            if (validUser) {
                this.store.dispatch(updateUser(validUser));
                this.showMessage(validUser.name +', seja bem vindo!', false);
                return true;
            }
        }
        this.showMessage('Usuário ou Senha inválido(s)', true);
        return false;
    }

    public canActivate(): boolean {
        if (this.loggedUser && this.loggedUser.id) {
            return true;
        } else {
            this.router.navigate(['/login']);
            this.showMessage('Login expirado!', true);
            return false;
        }
    }

    public logout(): void {
        this.store.dispatch(logout());
    }

}