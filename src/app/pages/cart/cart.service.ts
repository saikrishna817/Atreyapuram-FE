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

  constructor() {
    // Load cart items from localStorage when the service is instantiated
    // this.loadCartItems();
  }

  getCartItems() {
    return this.cartItems;
  }

  //Products count
  getCartItemCount(): number {
    return this.cartItems.length;
  }

  //Added to cart
  // addToCart(item: any) {
  //   const previousCount = this.getCartItemCount();
  //   this.cartItems.push(item);
  //   this.saveCartItems();// Save cart items to localStorage after adding a new item
  //   const currentCount = this.getCartItemCount();
  //   if (previousCount === 0 && currentCount > 0) {  // Notify subscribers only when transitioning from 0 to a positive count
  //     this.updateCartCount();
  //   }
  // }

  //Delete from cart
  // removeFromCart(index: number) {
  //   this.cartItems.splice(index, 1);
  //   this.saveCartItems();
  //   this.updateCartCount();
  // }

  //update count
  // private updateCartCount() {
  //   this.cartCountSubject.next(this.getCartItemCount());
  // }
 
  // private loadCartItems() {
  //   if (typeof localStorage !== 'undefined') {
  //     const storedItems = localStorage.getItem('cartItems');
  //     this.cartItems = storedItems ? JSON.parse(storedItems) : [];
  //   }
  // }

  // saveCartItems(items: any[] = this.cartItems) {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.setItem('cartItems', JSON.stringify(items));
  //   }
  // }
  //Check if item in cart
  // isItemInCart(item: any): boolean {
  //   return this.cartItems.some(cartItem => cartItem.name === item.name);
  // }
}
