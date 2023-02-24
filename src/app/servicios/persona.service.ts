import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from 'src/environments/environment.prod';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
    private baseUrl = environments.url + 'api/persona/';

    constructor(private httpClient: HttpClient) { }

    lista(): Observable<Persona[]> {      
        return this.httpClient.get<Persona[]>(this.baseUrl + 'lista')
            .pipe(
                catchError(this.handleError<Persona[]>('lista', []))
            );
    }

    getUna(id: number): Observable<Persona> {
        const url = `${this.baseUrl}buscar/${id}`;
        return this.httpClient.get<Persona>(url).pipe(
            catchError(this.handleError<Persona>(`getUna id=${id}`))
        );
    }

    crear(persona: Persona): Observable<Persona> {
        return this.httpClient.post<Persona>(this.baseUrl + 'crear', persona).pipe(
            catchError(this.handleError<Persona>('crear'))
        );
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.baseUrl + 'editar', inputdata).pipe(
            catchError(this.handleError<any>('editar'))
        );
    }

    borrar(id: number): Observable<Persona> {
        const url = `${this.baseUrl}delete/${id}`;
        return this.httpClient.delete<Persona>(url).pipe(
            catchError(this.handleError<Persona>('borrar'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }
}

