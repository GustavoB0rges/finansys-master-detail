import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() showButton: boolean = true;
  @Input() buttonClass: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;

  constructor(){}

  ngOnInit(): void {
   
    
  }

}
