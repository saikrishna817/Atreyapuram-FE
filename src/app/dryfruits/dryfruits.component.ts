import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-dryfruits',
  templateUrl: './dryfruits.component.html',
  styleUrl: './dryfruits.component.css'
})
export class DryfruitsComponent implements OnInit {

  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/items/jaggerydryfruit.JPG';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 

}
