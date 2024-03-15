import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jaggerymade',
  templateUrl: './jaggerymade.component.html',
  styleUrl: './jaggerymade.component.css'
})
export class JaggerymadeComponent implements OnInit {


  selectedImageUrl: string = '';

  ngOnInit(): void {
    this.selectedImageUrl = 'assets/GudPutharekulu-01.jpg';
  }

  showLargeImage(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
  } 
 
}  


