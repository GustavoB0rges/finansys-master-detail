import { BaseResourceModel } from '../../shared/models/base-resource.model';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = this.injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(map(this.jsonDataToResources.bind(this)), catchError(this.handleError), );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(map(this.jsonDataToResource.bind(this)), catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map((resource) => resource),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map((resource) => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // Protected methods

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element) =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
    // "as" = operador de conversão de tipo,
    // Por exemplo, se você tem uma variável de tipo "any" e deseja convertê-la para um tipo mais específico, pode usar "as" para realizar a conversão
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO =>', error);
    return throwError(() => error);
  }
}
