import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from '../models/header.data';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    private data = new BehaviorSubject<HeaderData>({
        title: 'Início', icon: 'home', url: '/'
    });

    constructor() {}

    get headerData() {
        return this.data.value;
    }

    set headerData(headerData: HeaderData) {
        this.data.next(headerData);
    }
}