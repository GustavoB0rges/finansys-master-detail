import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from './services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    private categoryService: CategoryService,
    protected override injector: Injector
  ) { 
    super('api/entries', injector);
  }

  override create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }

  // Private methods

  protected override jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
    // "as" = operador de conversão de tipo,
    // Por exemplo, se você tem uma variável de tipo "any" e deseja convertê-la para um tipo mais específico, pode usar "as" para realizar a conversão
  }

  protected override jsonDataToResource(jsonData: any): Entry {
    return jsonData as Entry;
  }

}


