import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private cartService: CartService) { }
  addToCart() {
    const itemToAdd = {
      // Define the properties of the item you want to add
      name: 'Jaggery',
      price: 199.00,
      // Add other properties as needed
    };
    this.cartService.addToCart(itemToAdd);
    console.log(itemToAdd,'ittttttt')
  }
}
