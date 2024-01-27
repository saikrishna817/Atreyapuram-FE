// cart.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  items: any[] = [];

  private cartCountSubject = new Subject<number>();
  cartCount$ = this.cartCountSubject.asObservable();
  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  addToCart(item: any) {
    const previousCount = this.getCartItemCount();

    this.cartItems.push(item);
    this.items.push(item);

    const currentCount = this.getCartItemCount();

    // Notify subscribers only when transitioning from 0 to a positive count
    if (previousCount === 0 && currentCount > 0) {
      this.updateCartCount();
    }
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCartCount();
  }
  private updateCartCount() {
    this.cartCountSubject.next(this.getCartItemCount());
  }

  isItemInCart(item: any): boolean {
    return this.cartItems.some(cartItem => cartItem.name === item.name);
  }
}
