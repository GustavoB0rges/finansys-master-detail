import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-menssages',
  templateUrl: './server-error-menssages.component.html',
  styleUrls: ['./server-error-menssages.component.css']
})
export class ServerErrorMenssagesComponent {

  @Input() serverErrorMessages: string[] = null;

}
