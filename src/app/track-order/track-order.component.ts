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
    const userId = this.userService.getLoggedInUserId();
    const postData = {
      product: {
        orderId: this.orderId,
        userId:userId,
        date:''
      }
    };
    const apiUrl = environment.placeOrder;
    this.http.post(apiUrl, postData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.error(err, 'errorrr');
      }
    );
  }
}