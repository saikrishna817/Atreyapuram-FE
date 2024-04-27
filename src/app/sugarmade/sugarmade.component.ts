import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugarmade',
  templateUrl: './sugarmade.component.html',
  styleUrl: './sugarmade.component.css'
})
export class SugarmadeComponent implements OnInit {

  
  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/items/sugar2.JPG';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 

}
