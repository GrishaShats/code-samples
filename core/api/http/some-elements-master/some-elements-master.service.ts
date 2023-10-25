import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { endpoints } from 'src/environments/environment.endpoints';
import { IElementPlainDTO, IElementDTO } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class SomeElementsMasterService {
  constructor(private http: HttpClient) {}

  getSomeHttpElements(): Observable<IElementPlainDTO[]> {
    return this.http
      .get<{ elements: IElementPlainDTO[] }>(`${endpoints.someElements.getSomeHttpElements()}`)
      .pipe(map(({ elements }) => elements));
  }

  createElement(someElement: IElementDTO): Observable<IElementDTO> {
    return this.http.post<IElementDTO>(endpoints.elements.createSomeElement(), someElement);
  }
}
