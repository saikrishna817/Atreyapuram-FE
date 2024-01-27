import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  showMessage: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }
  items: any[] = [
    { name: 'Jaggery', price: 199.00, imageSrc: 'assets/img/jaggerry.jpg' },
    { name: 'Sugar', price: 99.00, imageSrc: 'assets/img/sugar.webp' },
    { name: 'Jaggery Dry Fruit', price: 249.00, imageSrc: 'assets/img/dryfruit.webp' },
    { name: 'Jaggery Kaju Badam', price: 399.00, imageSrc: 'assets/img/jagkajubadam.webp' },
    { name: 'Sugar Kaju Badam', price: 299.00, imageSrc: 'assets/img/kajubadam.webp' },
    { name: 'Sugar Free Ghee', price: 149.00, imageSrc: 'assets/img/sugarfree.webp' },
    { name: 'Jaggery Dry Fruit Ghee', price: 279.00, imageSrc: 'assets/img/jaggerydryghee.jpg' },
    { name: 'Sugar Dry Fruit', price: 189.00, imageSrc: 'assets/img/sugardry.webp' },
    { name: 'Sugar Kaju Badam Pista', price: 449.00, imageSrc: 'assets/img/kajupista.webp' },
    { name: 'Sugar Free Dry Fruits', price: 249.00, imageSrc: 'assets/img/sugarfreedry.avif' },
    { name: 'Kova Dry Fruit', price: 499.00, imageSrc: 'assets/img/kovadry.webp' },
    { name: 'Jaggery Kaju Badam Pista', price: 599.00, imageSrc: 'assets/img/bellamkajupista.jpg' },
  ];

 addToCart(item: any) {
    if (this.cartService.isItemInCart(item)) {
      // Product is already in the cart
      this.message = `Product is already in the cart`;
      this.showMessage = true;

      // Hide the message after 2 seconds (adjust as needed)
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    } else {
      // Product is not in the cart, add it
      this.cartService.addToCart(item);
      this.message = `Product added to cart successfully`;
      this.showMessage = true;

      // Hide the message after 2 seconds (adjust as needed)
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }
  }

  // addToCart(item: any) {
  //   this.cartService.addToCart(item);
  //   // this.message = `${item.name} added to cart successfully`;
  //   this.message = `Product added to cart successfully`;
  //   this.showMessage = true;
  //   // Hide the message after 2 seconds (adjust as needed)
  //   setTimeout(() => {
  //     this.showMessage = false;
  //   }, 3000);
  // }
}