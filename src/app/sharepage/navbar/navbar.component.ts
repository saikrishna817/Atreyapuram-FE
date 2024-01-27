// navbar.component.ts

import { Component } from '@angular/core';
import { CartService } from '../../pages/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItemCount: number = 0;

  constructor(public cartService: CartService) {
    this.cartService.cartCount$.subscribe((count: number) => {
      if (count > 0) {
        this.cartItemCount = count;
        // Add your notification logic here
        console.log('Item added to cart. Notification shown.');
      }
    });
  }
}
