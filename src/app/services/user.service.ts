import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class UserService {
    public url: string;

    constructor(public http: HttpClient) {
        this.url = global.url;
    }

    post(ruta, datos){   
        debugger;     
        let httpParams = new HttpParams().append("json", JSON.stringify(datos));
        return this.http.post(this.url+ruta, httpParams);
    }
}