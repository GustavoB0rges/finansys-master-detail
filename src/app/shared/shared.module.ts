import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMenssagesComponent } from './components/server-error-menssages/server-error-menssages.component';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMenssagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Modules
    CommonModule,
    ReactiveFormsModule,

    //Components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMenssagesComponent
  ]
})
export class SharedModule { }
