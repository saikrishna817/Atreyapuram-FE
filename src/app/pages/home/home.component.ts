import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentIndex = 0;
  images: string[] = [
    'assets/img/atreyapuram_putharekulu_cover.jpg',
    'assets/img/cover2.jpg',
    'assets/bellam-kaju-badham-pistha-scaled.jpg',
    'assets/img/cover3.jpg'
  ];

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  showPrev() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

}
