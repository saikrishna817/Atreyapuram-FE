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
    // Load cart items from localStorage when the service is instantiated
    this.loadCartItems();
  }

  getCartItems() {
    console.log(this.cartProducts, 'cppp')
    return this.cartProducts;
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

  // Delete from cart

  removeFromCart(item: any) {
    console.log(item, 'itemmmmmm');
    const productId = item.ProductID;
    const userId = this.userService.getLoggedInUserId();
    console.log(productId, userId, 'pu iddddsss')
    const postData = {
      filter: {
        userid: userId,
        product: productId
      }
    };
    const apiUrl = environment.deleteCartItem;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: postData // Include payload as the body
    };
    this.http.request('delete', apiUrl, httpOptions).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.error(err, 'errorrr');
      }
    );

  }

  //update count
  private updateCartCount() {
    this.cartCountSubject.next(this.getCartItemCount());
  }

  private loadCartItems() {
    if (typeof localStorage !== 'undefined') {
      const storedItems = localStorage.getItem('cartItems');
      this.cartItems = storedItems ? JSON.parse(storedItems) : [];
    }
  }

  saveCartItems(items: any[] = this.cartProducts) {
    console.log(items, 'save itemsssss')
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }
  //Check if item in cart
  // isItemInCart(item: any): boolean {
  //   return this.cartItems.some(cartItem => cartItem.name === item.name);
  // }
}
