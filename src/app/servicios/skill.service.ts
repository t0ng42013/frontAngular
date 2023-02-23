import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { Skill } from '../modelo/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
    private url = environments.url;
    //url = 'https://portfolio3-2.onrender.com/api/skill/';
    //url = 'http://localhost:8080/api/skill/';

    constructor(private httpClient: HttpClient) { }

    lista(): Observable<any> {
        return this.httpClient.get(this.url + 'api/skill/lista');
    }

    getUna(id: number): Observable<any> {
        return this.httpClient.get(this.url + `api/skill/buscar/${id}`);
    }

    crear(skill: Skill): Observable<any> {
        return this.httpClient.post(this.url + 'api/skill/crear', skill);
    }

    editar(inputdata: any): Observable<any> {
        return this.httpClient.put(this.url + 'api/skill/editar', inputdata)
    }

    borrar(id: number): Observable<any> {
        return this.httpClient.delete(this.url + `api/skill/delete/${id}`);
    }

}
