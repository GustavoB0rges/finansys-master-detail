import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  showSuccess(event: Event): void{
    event.preventDefault();
    this.toastr.success('everything is broken', 'Major Error');
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // PRIVATE METHODS

  private setCurrentAction(): void {
    this.currentAction = this.route.snapshot.url[0].path === 'new' ? 'new' : 'edit';
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [ Validators.required, Validators.minLength(2) ]],
      description: [null]
    });
  }

  private loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe({
        next: (category) => {
          this.category = category;
          this.categoryForm.patchValue(this.category);
        },
        error: (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      })
    }
  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

}
function next(value: Category): void {
  throw new Error('Function not implemented.');
}

