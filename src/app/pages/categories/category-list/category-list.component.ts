import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();    
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => alert('Erro ao carregar a Lista de Categorias')
    });
  }

  deleteCategory(category: any): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe({
        next: () => this.categories = this.categories.filter(element => element !== category),
        error: (error) => alert('Erro ao exluir o registro'),
      });
    }
  }

}
