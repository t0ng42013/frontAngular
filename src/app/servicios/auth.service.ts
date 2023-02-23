import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credentials } from '../modelo/Credentials';
import { environments } from 'src/environments/environment.prod';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = environments.url;
    //url = 'https://lga.onrender.com';
    //url = 'http://localhost:8080';
    constructor(private httpClient: HttpClient) { }

    login(creds: Credentials) {
        return this.httpClient.post(this.url + 'login', creds, {
            observe: 'response',
        }).pipe(map((Response: HttpResponse<any>) => {
            const body = Response.body;
            const headers = Response.headers;

            const bearerToken = headers.get('Authorization')!;
            const token = bearerToken.replace('Bearer ', '');

            localStorage.setItem('token', token);

            return body;
        }))
    }

    getToken() {
        return localStorage.getItem('token');
    }
}
