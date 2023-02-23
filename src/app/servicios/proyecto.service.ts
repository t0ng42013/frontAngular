import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { Proyecto } from '../modelo/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
    private url = environments.url + 'api/proyecto/';
   
    constructor(private httpClient: HttpClient) { }

    lista(): Observable<Proyecto[]> {        
        return this.httpClient.get<Proyecto[]>(this.url + 'lista')           
            .pipe(
                catchError(this.handleError<Proyecto[]>('lista', []))
            );
    }

    getUna(id: number): Observable<any> {
        return this.httpClient.get(this.url + `buscar/${id}`);
    }

    crear(proyecto: Proyecto): Observable<any> {
        return this.httpClient.post(this.url + 'crear', proyecto);
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.url + 'editar', inputdata)
    }

    borrar(id: number): Observable<any> {
        return this.httpClient.delete(this.url + `delete/${id}`);
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }
}
