import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems, 'ccccc ittttemsss')
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

}
