// cart.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {
    // Load cart items from localStorage when the service is instantiated
    this.loadCartItems();
  }
  private cartItems: any[] = [];
  items: any[] = [];
  private cartCountSubject = new Subject<number>();
  cartCount$ = this.cartCountSubject.asObservable();

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount(): number {
    console.log(this.cartItems.length,'lengthuuuuu');
    return this.cartItems.length;
  }

  
  addToCart(item: any) {
    const previousCount = this.getCartItemCount();

    this.cartItems.push(item);

    // Save cart items to localStorage after adding a new item
    this.saveCartItems();

    const currentCount = this.getCartItemCount();

    // Notify subscribers only when transitioning from 0 to a positive count
    if (previousCount === 0 && currentCount > 0) {
      this.updateCartCount();
    }
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
    this.updateCartCount();
  }
  private updateCartCount() {
    this.cartCountSubject.next(this.getCartItemCount());
  }
 private saveCartItems() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}

private loadCartItems() {
  if (typeof localStorage !== 'undefined') {
    const storedItems = localStorage.getItem('cartItems');
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
  }
}


  isItemInCart(item: any): boolean {
    return this.cartItems.some(cartItem => cartItem.name === item.name);
  }
}
