import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combosaving',
  templateUrl: './combosaving.component.html',
  styleUrl: './combosaving.component.css'
})
export class CombosavingComponent implements OnInit {

  
  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/items/combos1.JPG';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 

}
