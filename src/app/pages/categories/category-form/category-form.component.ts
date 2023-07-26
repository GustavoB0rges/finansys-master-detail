import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent} from '../../../shared/components/base-resource-form/base-resource-form'

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected override toastr: ToastrService,
    protected categoryService: CategoryService,
    protected override injector: Injector
    ) {
      super(new Category(),injector, toastr, categoryService, Category.fromJsonData)
    }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [ Validators.required, Validators.minLength(2) ]],
      description: [null, Validators.maxLength(20)]
    });
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected override editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return categoryName;
  }
}
