import { Injectable, OnInit } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';

@Injectable()
export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = []

  constructor(private baseResourceService: BaseResourceService<T> ) { }

  ngOnInit(): void {
    this.getAllResources();    
  }

  getAllResources(): void {
    this.baseResourceService.getAll().subscribe({
      next: (resources) => this.resources = resources,
      error: (error) => alert('Erro ao carregar a Lista de Categorias')
    });
  }

  deleteResource(resource: T): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.baseResourceService.delete(resource.id).subscribe({
        next: () => this.resources = this.resources.filter(element => element !== resource),
        error: (error) => alert('Erro ao exluir o registro'),
      });
    }
  }

}
