import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  images: string[] = ["assets/items/sugar2.JPG", "assets/items/combos2.JPG", "assets/items/jaggerydryfruit.JPG", "assets/items/carosal2.JPG", "assets/items/sugardryfruit.JPG"];
  currentIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change image every 3 seconds (adjust as needed)
  }
}
