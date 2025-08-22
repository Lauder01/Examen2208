import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mountain {
  id: number;
  name: string;
  height: number;
  location: string;
  ascentDate?: string;
  isClimbed: boolean;
}

export interface MountainQuery {
  page: number;
  pageSize: number;
  name?: string;
  location?: string;
  minHeight?: number;
  maxHeight?: number;
}

export interface MountainPagedResult {
  data: Mountain[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class MountainService {
  private apiUrl = 'http://localhost:5046/api/Mountain'; // Corregido: Mountain con M mayúscula

  constructor(private http: HttpClient) {}

  getMountains(query: MountainQuery): Observable<MountainPagedResult> {
    let params = new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);

    if (query.name) params = params.set('name', query.name);
    if (query.location) params = params.set('location', query.location);
    if (query.minHeight !== undefined && query.minHeight !== null && !isNaN(query.minHeight)) {
      params = params.set('minHeight', query.minHeight.toString());
    }
    if (query.maxHeight !== undefined && query.maxHeight !== null && !isNaN(query.maxHeight)) {
      params = params.set('maxHeight', query.maxHeight.toString());
    }

    console.log('Parámetros HTTP enviados:', params.toString());

    return this.http.get<MountainPagedResult>(`${this.apiUrl}`, { params });
  }

  getMountainById(id: number): Observable<Mountain> {
    return this.http.get<Mountain>(`${this.apiUrl}/${id}`);
  }
}
