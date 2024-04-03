import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {

    // Retrieve cart items count from local storage when the service is initialized
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      const count = Number(localStorage.getItem('cartItemsCount'));
      if (!isNaN(count)) {
        this.cartItemsCountSubject.next(count);
      }
    }
  }

  updateCartItemsCount(count: number) {
    // Update cart items count in local storage
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      localStorage.setItem('cartItemsCount', count.toString());
    }
    this.cartItemsCountSubject.next(count);
  }
  public updateCartItems(cartItems: any[]): void {
    this.cartItemsSubject.next(cartItems);
  }
  // Method to check if an item is already in the cart
  isItemInCart(productId: string): boolean {
    console.log(this.cartItems$,'present items in ca')
    const currentCartItems = this.cartItemsSubject.value;
    console.log(currentCartItems, 'currenttt itemsuuu in cartttt')
    return currentCartItems.some(item => item.ProductID === productId);
  }

  
}
