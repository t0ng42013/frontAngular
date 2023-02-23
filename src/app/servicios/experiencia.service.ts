import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { Experiencia } from '../modelo/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
    private url = environments.url;
   //url ='https://portfolio3-2.onrender.com/api/experiencia/';
  // url = 'http://localhost:8080/api/experiencia/';

    constructor(private httpClient: HttpClient) { }

    lista(): Observable<any> {
        return this.httpClient.get(this.url + 'api/experiencia/lista');
    }

    getUnaExp(id: number): Observable<any> {
        return this.httpClient.get(this.url + `api/experiencia/buscar/${id}`);
    }

    crear(experiencia: Experiencia): Observable<any> {
        return this.httpClient.post(this.url + 'api/experiencia/crear', experiencia);
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.url + 'api/experiencia/editar', inputdata)
    }

    borrar(id: number): Observable<any> {
        return this.httpClient.delete(this.url + `api/experiencia/delete/${id}`);
    }
}
