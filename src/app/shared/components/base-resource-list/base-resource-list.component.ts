import { Injectable, OnInit } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';

@Injectable()
export class BaseResourceListComponent<T> implements OnInit {

  resources: T[] = []

  constructor(private baseResourceService: BaseResourceService<T>) { }

  ngOnInit(): void {
    this.getAllCategories();    
  }

  getAllCategories(): void {
    this.baseResourceService.getAll().subscribe({
      next: (resources) => this.resources = resources,
      error: (error) => alert('Erro ao carregar a Lista de Categorias')
    });
  }

  deleteCategory(category: any): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.baseResourceService.delete(category.id).subscribe({
        next: () => this.resources = this.resources.filter(element => element !== category),
        error: (error) => alert('Erro ao exluir o registro'),
      });
    }
  }

}
