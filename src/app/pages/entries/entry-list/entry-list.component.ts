import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getAllCategories();    
  }

  getAllCategories(): void {
    this.entryService.getAll().subscribe({
      next: (entries) => this.entries = entries.sort((a,b) => b.id - a.id),
      error: (error) => alert('Erro ao carregar a Lista de Categorias')
    });
  }

  deleteEntry(entry: any): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe({
        next: () => this.entries = this.entries.filter(element => element !== entry),
        error: (error) => alert('Erro ao exluir o registro'),
      });
    }
  }

}
