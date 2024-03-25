import { Component, OnInit } from '@angular/core';
import { CartService } from '../pages/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../sharepage/navbar/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AdminService } from './admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  userId: any;
  orderItems: any;
  order_Id: any;
  orderIds:any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private adminservice: AdminService,
    private http: HttpClient
  ) {
    this.orderIds = this.adminservice.getOrderId();
    console.log(this.orderIds,'All order ids in component')
  }
  ngOnInit() {
    this.getOrderDetails()

  }
  
  getOrderDetails() {
    this.userId = this.userService.getLoggedInUserId();
    
    console.log("User ID:", this.userId);
    console.log("Order IDs:", this.orderIds);

    if (this.userId && this.orderIds.length > 0) {
      const userId = this.userId;
      const postData = {
        userid: userId,
      };

      const apiUrl = environment.getOrder;

      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.orderItems = res.products;
          console.log(this.orderItems, 'Ordered products');
        },
        (err: any) => {
          console.error(err, 'Error fetching order details');
        }
      );
    } else {
      console.log("User ID or Order IDs are not available.");
    }
  }
}
