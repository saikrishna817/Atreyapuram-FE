import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  cartItemsCount$: Observable<number> = this.cartItemsCountSubject.asObservable();

  private productCartIdsMapping: { [productId: string]: string[] } = {};

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Retrieve cart items count from local storage when the service is initialized
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      const count = Number(localStorage.getItem('cartItemsCount'));
      if (!isNaN(count)) {
        this.cartItemsCountSubject.next(count);
      }
    }
    // Retrieve cart items count from local storage when the service is initialized
    if (typeof localStorage !== 'undefined') {
      const count = Number(localStorage.getItem('cartItemsCount'));
      if (!isNaN(count)) {
        this.cartItemsCountSubject.next(count);
      }
      const savedCartIds = localStorage.getItem('cartIds');
      if (savedCartIds) {
        this.productCartIdsMapping = JSON.parse(savedCartIds);
      }
    }
  }

  removeCartIdForProduct(productId: string, cartId: string): void {
    console.log(productId,cartId,'remove from localll storagee')
    const index = this.productCartIdsMapping[productId].indexOf(cartId);
    if (index !== -1) {
      this.productCartIdsMapping[productId].splice(index, 1);
      // Store updated cart IDs to localStorage if available
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cartIds', JSON.stringify(this.productCartIdsMapping));
      }
    }
  }

  updateCartItemsCount(count: number): void {
    // Update cart items count in local storage
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      localStorage.setItem('cartItemsCount', count.toString());
    }
    this.cartItemsCountSubject.next(count);
  }

  // Method to add a cart ID to the mapping for a specific product ID
  addCartIdForProduct(productId: string, cartId: string): void {
    if (!this.productCartIdsMapping[productId]) {
      this.productCartIdsMapping[productId] = [];
    }
    if (!this.productCartIdsMapping[productId].includes(cartId)) {
      this.productCartIdsMapping[productId].push(cartId);
    }
    // Store updated cart IDs to localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartIds', JSON.stringify(this.productCartIdsMapping));
    }
    console.log(this.productCartIdsMapping,'product mappinguuu')
  }

  // Method to get cart IDs associated with a specific product ID
  getCartIdsForProduct(productId: string): string[] {
    return this.productCartIdsMapping[productId] || [];
  }

  decrementCartItemsCount(): void {
    this.cartItemsCount$.pipe(take(1)).subscribe(count => {
      const newCount = Math.max(count - 1, 0);
      this.cartItemsCountSubject.next(newCount);
      // Update cart items count in local storage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cartItemsCount', newCount.toString());
      }
    });
  }
  // Method to print the product-to-cart ID mappings in the console
  printProductCartIdMappings(): void {
    console.log(this.productCartIdsMapping,"Product-to-Cart ID Mappings:");
    console.log(this.productCartIdsMapping);
  }


  // Method to check if an item is already in the cart
  isItemInCart(productId: string): boolean {
    // You can implement this method based on your requirements
    return false;
  }

  // Method to add an item to the cart
  addItemToCart(productId: string, cartId: string): void {
    // You can implement this method based on your requirements
  }
}
