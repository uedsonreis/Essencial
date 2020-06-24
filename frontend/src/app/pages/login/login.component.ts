import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'add-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User = { username: '', password: '' };

    constructor(headerService: HeaderService, private authService: AuthService, private router: Router) {
        headerService.headerData = {
            title: 'Login', icon: 'login', url: '/login'
        };
    }

    ngOnInit(): void {
        this.authService.logout();
    }

    public isValid(): boolean {
        const { username, password } = this.user;
        if (!username || username === null || username.trim() === '') return false;
        if (!password || password === null || password.trim() === '') return false;
        return true;
    }

    public login() {
        const logged = this.authService.login(this.user).subscribe(logged => {
            if (logged) this.router.navigate(['']);
        });
    }

}