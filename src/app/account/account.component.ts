import { Component, } from '@angular/core';
import { UserService } from '../sharepage/navbar/navbar.service';
import { CartService } from '../pages/cart/cart.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  name: string | undefined;
  email: string | undefined;
  constructor(
    public cartService: CartService,
    private userService: UserService,
  ) {

  }
  ngOnInit(): void {
    this.name = this.userService.userName
    this.email = this.userService.userEmail
  }
}



