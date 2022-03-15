import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.model';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';


const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private _http: HttpClient) { }

  getEntityById(id: number):Observable<Entity>{
    return this._http.get<Entity>(`${BASE_URL}/${id}`)
            .pipe( map( (res:any) => res.data))
  }
}
