import { Component,OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: any[];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }
  ngOnInit() {
    this.cartItems.forEach(item => {
      if (!item.quantity || !item.total) {
        item.quantity = 1;
        item.total = item.quantity * item.price;
      }
    });
  }


  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.updateTotal(item);
    this.cartService.saveCartItems(this.cartItems); // Pass the cart items to saveCartItems
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal(item);
      this.cartService.saveCartItems(this.cartItems); // Pass the cart items to saveCartItems
    }
  }
  updateTotal(item: any) {
    item.total = item.quantity * item.price;
  }
  // saveCartItems() {
  //   this.cartService.saveCartItems(this.cartItems);
  // }
}
