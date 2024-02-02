import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[];

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private http: HttpClient) {
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

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  openModal() {
    this.cartService.openModal();
  }

}
