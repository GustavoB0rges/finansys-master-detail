import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    MenubarModule,
    IMaskModule
  ],
})
export class EntriesModule { }
