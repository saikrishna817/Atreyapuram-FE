import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  images: string[] = ["assets/img/ptr1.jpg", "assets/img/sugarfreedry.avif", "assets/img/kajupista.webp", "assets/img/ptr1.jpg", "assets/img/ptr2.jpeg"];
  currentIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change image every 3 seconds (adjust as needed)
  }
}
