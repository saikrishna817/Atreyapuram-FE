import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../sharepage/navbar/navbar.service';
import { OrderService } from './orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  userId: any;
  orderIds: any;
  orderedStatus:any;
  orderedProducts: any;
  orderedDate: any;
  deliveryAddress: any[] = [];
  imageUrl: any;
  loading: boolean = true;
  showMessage: boolean =false

  constructor(
    private userService: UserService,
    private orderservice: OrderService,
    private http: HttpClient,
    private toastr: ToastrService
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
    if (this.userId) {
      const userId = this.userId;
      const postData = {
        userid: userId,
      };
      const apiUrl = environment.getOrder;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          // Filter out orders with status other than 'Placed' and map the remaining orders
          this.orderedProducts = res.order
            .filter((order: any) => order.orderstatus === 'Placed')
            .map((order: any) => {
              return {
                orderId: order.orderid,
                orderedDate: order.date,
                orderedStatus: order.orderstatus,
                products: JSON.parse(order.product)
              };
            });
          this.loading = false;
          for (const order of this.orderedProducts) {
            this.getOrderAddress(order.orderId);
          }
          console.log(this.orderedProducts, 'productttsuuuu');
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

  confirmCancelOrder(item: any) {
    // this.orderedStatus = item.orderedStatus
    // console.log(item, 'itemmmmm all cancel')
    // console.log(this.orderedStatus,'deletinggg itemmm')
    const orderID = item.orderId;
    const userId = this.userService.getLoggedInUserId();
    console.log(orderID, userId, item, 'Cancel Orderrr')
    const postData = {
      updatedData: {
        orderstatus: 'Cancelled',
      },
      orderid: orderID,
      userid:userId
    };
    const apiUrl = environment.cancelOrder;
    this.http.post(apiUrl, postData).subscribe(
      (res: any) => {
        console.log(res)
        // this.toastr.success('Order has been cancelled successfully.');
        // this.loading = true;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
        // this.orderedProducts =[]
        this.getOrderDetails()
      },
      error => {
        console.error('Error retrieving ordered products:', error);
      }
    );
  }
}







