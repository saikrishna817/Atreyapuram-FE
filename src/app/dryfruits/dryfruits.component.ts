import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-dryfruits',
  templateUrl: './dryfruits.component.html',
  styleUrl: './dryfruits.component.css'
})
export class DryfruitsComponent implements OnInit {

  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/GudPutharekulu-01.jpg';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 

}
