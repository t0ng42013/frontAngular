import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { Educacion } from '../modelo/educacion';

@Injectable({
    providedIn: 'root'
})
export class EducacionService {
    private url = environments.url;
   //url = 'https://portfolio3-2.onrender.com/api/educacion/';
    //url = 'http://localhost:8080/api/educacion/';

    constructor(private httpClient: HttpClient) { }

    lista(): Observable<any> {
        return this.httpClient.get(this.url + 'api/educacion/lista');
    }

    getUna(id: number): Observable<any> {
        return this.httpClient.get(this.url + `api/educacion/buscar/${id}`);
    }

    crear(educacion: Educacion): Observable<any> {
        return this.httpClient.post(this.url + 'api/educacion/crear', educacion);
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.url + 'api/educacion/editar', inputdata)
    }

    borrar(id: number): Observable<any> {
        return this.httpClient.delete(this.url + `api/educacion/delete/${id}`);
    }
}
