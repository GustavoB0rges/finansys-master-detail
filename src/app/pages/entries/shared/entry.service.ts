import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) { 
    super('api/entries', injector, Entry.fromJsonData);
  }

  override create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendtoService(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendtoService(entry, super.update.bind(this));
  }

  setCategoryAndSendtoService(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

}


