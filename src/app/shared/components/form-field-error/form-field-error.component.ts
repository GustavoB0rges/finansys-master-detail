import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMenssage }}
    </p> 
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input() formControl: FormControl;

  constructor() { }

  ngOnInit(): void { }

  public get errorMenssage(): string | null {
    if (this.mustShowErrorMenssage())
    return this.getErrorMenssage();
    else
      return null;
  }

  private mustShowErrorMenssage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMenssage(): string | null {
    if (this.formControl.errors['required']) {
      return 'dado obrigatório';
    }

    else if (this.formControl.errors['email']) {
      return 'formato de e-mail inválido';
    }
    
    else if (this.formControl.errors['minlength']) {
      const requiredLength = this.formControl.errors['minlength'].requiredLength;
      return `deve ter no mínimo ${requiredLength} caracteres`;
    }

    else if (this.formControl.errors['maxlength']) {
      const requiredLength = this.formControl.errors['maxlength'].requiredLength;
      return `deve ter no máximo ${requiredLength} caracteres`;
    }
    
  }

}
