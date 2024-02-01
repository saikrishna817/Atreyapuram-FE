import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[];
  checkoutForm: FormGroup;
  showCouponField = false;

  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
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
 
  toggleCouponField() {
      this.showCouponField = !this.showCouponField;
      const couponLabel = document.querySelector('label[for="showCoupon"]') as HTMLElement;
      
      if (couponLabel) {
          if (this.showCouponField) {
              couponLabel.style.display = 'none';
          } else {
              couponLabel.style.display = 'block';
          }
      }
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


  //CheckOut


}
