// cart.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../../sharepage/navbar/navbar.service';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private cartProducts: any[] = [];

  items: any[] = [];
  private cartCountSubject = new Subject<number>();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private userService: UserService,
    private http: HttpClient,) {
    this.loadCartItems();
  }

  private loadCartItems() {
    console.log(this.cartProducts,'load cart products')
    if (typeof localStorage !== 'undefined') {
      const storedItems = localStorage.getItem('cartProducts');
      this.cartProducts = storedItems ? JSON.parse(storedItems) : [];
    }
  }


  saveCartItems(items: any[] = this.cartItems) {
    console.log(this.cartItems,'saved cart productsss')
    if (!Array.isArray(items)) {
      console.error('Items must be an array.');
      return;
    }
    const itemsWithQuantity = items.map(item => ({ ...item, quantity: item.quantity || 1 }));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(itemsWithQuantity));
    }
  }


  getCartItems() {
    console.log(this.cartItems, 'cppp')
    return this.cartItems;
  }

  //Products count
  getCartItemCount(): number {
    return this.cartItems.length;
  }

  //Added to cart
  addToCart(item: any) {
    const previousCount = this.getCartItemCount();
    this.cartItems.push(item);
    this.saveCartItems();
    console.log(this.cartItems, 'itemssss')
    const currentCount = this.getCartItemCount();
    if (previousCount === 0 && currentCount > 0) {
      this.updateCartCount();
    }
  }

  //update count
  private updateCartCount() {
    this.cartCountSubject.next(this.getCartItemCount());
  }

}
