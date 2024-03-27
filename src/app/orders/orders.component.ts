import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../sharepage/navbar/navbar.service';
import { OrderService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  userId: any;
  orderIds: any;
  orderedProducts: any;
  deliveryAddress: any[] = [];
  imageUrl: any;

  constructor(
    private userService: UserService,
    private orderservice: OrderService,
    private http: HttpClient
  ) {
    this.orderIds = this.orderservice.getOrderId();// Get order ids from Order service
  }

  ngOnInit() {
    //Load the order details whenever component is initialized
    this.getOrderDetails()
  }

  //Get order data for a particular user[logged-in user]
  getOrderDetails() {
    this.userId = this.userService.getLoggedInUserId();
    console.log('hii  orderss',this.userId)
    console.log('hii  length',this.orderIds.length)
    if (this.userId) {
      const userId = this.userId;
      const postData = {
        userid: userId,
      };
      const apiUrl = environment.getOrder;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.orderedProducts = res.order.map((order: any) => {
            return {
              orderId: order.orderid,
              products: JSON.parse(order.product)
            };
          });
          for (const order of this.orderedProducts) {
            this.getOrderAddress(order.orderId);
          }
        },
        error => {
          console.error('Error retrieving ordered products:', error);
        }
      );
    }

  }

  //Get address for that particular order based on order Id
  getOrderAddress(orderId: string) {
    const userId = this.userId;
    const postData = {
      condition: {
        user_id: userId,
        orderid: orderId
      }
    };
    const apiUrl = environment.getAddress;
    this.http.post(apiUrl, postData).subscribe(
      (res: any) => {
        if (!this.deliveryAddress) {
          this.deliveryAddress = [];
        }
        this.deliveryAddress.push(res.deliveryAddress);
      },
      error => {
        console.error('Error retrieving address for Order ID', orderId, ':', error);
      }
    );
  }

}






