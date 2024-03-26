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
    this.loadCartItemsFromServer();
  }

  // getCartItems() {
  //   console.log(this.cartProducts, 'cppp')
  //   return this.cartProducts;
  // }

  // //Products count
  // getCartItemCount(): number {
  //   return this.cartItems.length;
  // }

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
    this.saveCartItems();
  }

  //update count
  private updateCartCount() {
    this.cartCountSubject.next(this.getCartItemCount());
  }

  private loadCartItemsFromServer() {
    const userId = this.userService.getLoggedInUserId();
    if (userId) {
      const postData = {
        userId: userId,
      };
      const apiUrl = environment.getCart;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.cartItems = res.products.map((product: any) => ({
            ...product,
            quantity: res.items.filter((x: any) => x === product.ProductID).length,
            total: parseFloat(product.Price) * res.items.filter((x: any) => x === product.ProductID).length
          }));
          this.saveCartItems(); // Save cart items locally
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }
  private saveCartItems() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    // Update cart count subject
    this.cartCountSubject.next(this.getCartItemCount());
  }
  // Get cart items
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Get cart item count
  getCartItemCount(): number {
    return this.cartItems.length;
  }
  // Increment quantity
  incrementQuantity(item: any) {
    item.quantity++;
    console.log(item.quantity,'item qauntityyyyy')
    item.total = parseFloat(item.Price) * item.quantity;
    this.saveCartItems(); // Save cart items locally
  }

  // Decrement quantity
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = parseFloat(item.Price) * item.quantity;
      this.saveCartItems(); // Save cart items locally
    }
  }

}
