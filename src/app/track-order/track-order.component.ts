import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../sharepage/navbar/navbar.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orderId: any;
  userId: any;
  expectedArrivalDate: any;
  orderStatus: any;


  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(this.orderId, 'orderr id')
    });
    this.getTrackOrderDetails()
  }

  getTrackOrderDetails() {
    this.userId = this.userService.getLoggedInUserId();
    if (this.userId) {
      const userId = this.userId;
      const postData = {
        userid: userId,
      };
      const apiUrl = environment.getOrder;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          // Filter out cancelled orders and find the matched order
          const matchedOrder = res.order.find((order: any) => order.orderid === this.orderId && order.orderstatus !== 'Cancelled');
          if (matchedOrder) {
            // Calculate expected arrival date after 7 days
            const actualDate = new Date(matchedOrder.date);
            actualDate.setDate(actualDate.getDate() + 7);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            this.expectedArrivalDate = actualDate.toLocaleDateString('en-US', options);

            this.orderStatus = matchedOrder.orderstatus;
          } else {
            console.error('No matching order found for orderId:', this.orderId);
          }
        },
        error => {
          console.error('Error retrieving ordered products:', error);
        }
      );
    }
  }


}