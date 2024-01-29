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
  
    // Set the initial quantity and total for each item
    this.cartItems.forEach(item => {
      item.quantity = 1;
      item.total = item.quantity * item.price; // Set the initial total
    });
  }
  

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.updateTotal(item);
    // Update total or perform other necessary logic
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal(item);
      // Update total or perform other necessary logic
    }
  }

  updateTotal(item: any) {
    item.total = item.quantity * item.price;
  }
}
