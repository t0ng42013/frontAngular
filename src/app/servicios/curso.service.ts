import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { Curso } from '../modelo/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
    private url = environments.url;
   //url ='https://portfolio3-2.onrender.com/api/curso/'
    // url = 'http://localhost:8080/api/curso/'
    constructor(private httpClient: HttpClient) { }

    lista(): Observable<any> {
        return this.httpClient.get(this.url + 'api/curso/lista');
    }

    getUna(id: number): Observable<any> {
        return this.httpClient.get(this.url + `api/curso/buscar/${id}`);
    }

    crear(curso: Curso): Observable<any> {
        return this.httpClient.post(this.url + 'api/curso/crear', curso);
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.url + 'api/curso/editar', inputdata)
    }

    borrar(id: number): Observable<any> {
        return this.httpClient.delete(this.url + `api/curso/delete/${id}`);
    }
}
