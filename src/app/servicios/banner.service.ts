import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Banner } from '../modelo/banner';


@Injectable({
  providedIn: 'root'
})
export class BannerService {
    private url = environments.url;
    //url ='https://lga.onrender.com/api/banner/';
    //url = 'http://localhost:8080/api/banner/';
    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<Banner[]> {
        return this.httpClient.get<Banner[]>(this.url + 'api/banner/lista');
    }

    public create(banner: Banner): Observable<any> {
        return this.httpClient.post<any>(this.url + 'api/banner/create', banner);
    }

    public editar(banner: Banner): Observable<any> {
        return this.httpClient.put(this.url + 'api/banner/editar', banner);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.url + `api/banner/delete/${id}`);
    }
}
