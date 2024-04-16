import { Component, } from '@angular/core';
import { UserService } from '../sharepage/navbar/navbar.service';
import { CartService } from '../pages/cart/cart.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../sharepage/localstorage.service';
import { OrderService } from '../orders/orders.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  name: string | undefined;
  email: string | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
  ordersLength: any;
  constructor(
    public cartService: CartService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private orderservice: OrderService
  ) {
  }

  ngOnInit(): void {
    // this.ordersLength = this.orderservice.orderedProducts.length
    this.name = this.userService.getLoggedInUserName();
    this.email = this.userService.getLoggedInUserEmail();
  }


  logout() {
    // this.userService.setLoggedInUserDetails('', '');
    // this.router.navigate(['/home']);
    this.userService.clearLoggedInUserDetails();
    this.userName = '';
    this.router.navigate(['/home']);
  }

}



