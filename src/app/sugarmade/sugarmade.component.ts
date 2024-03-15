import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugarmade',
  templateUrl: './sugarmade.component.html',
  styleUrl: './sugarmade.component.css'
})
export class SugarmadeComponent implements OnInit {

  
  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/GudPutharekulu-01.jpg';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 

}
