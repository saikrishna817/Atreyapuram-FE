import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../sharepage/navbar/navbar.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


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
  orderPlacedDate: any;
  orderedProducts: any;
  totalSubTotal: any;
  shippingCharges: any;
  grandTotal: any;
  grandTotalText: any;
  grandTotalInWords: string = '';
  deliveryAddress: any[] = [];

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
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
          // Filter out orders and find the matched order based on order id
          const matchedOrder = res.order.find((order: any) => order.orderid === this.orderId);
          if (matchedOrder) {
            this.orderPlacedDate = matchedOrder.date
            // Calculate expected arrival date after 7 days
            const actualDate = new Date(matchedOrder.date);
            actualDate.setDate(actualDate.getDate() + 7);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            this.expectedArrivalDate = actualDate.toLocaleDateString('en-US', options);
            //Order status
            this.orderStatus = matchedOrder.orderstatus;
            //All Product details for particular order
            this.orderedProducts = [{
              orderId: matchedOrder.orderid,
              orderedDate: matchedOrder.date,
              orderedStatus: matchedOrder.orderstatus,
              products: JSON.parse(matchedOrder.product).map((product: any) => {
                product.taxratePercent = 5;
                product.taxRate = 5/100;
                product.taxAmount = product.price * product.taxRate // Calculate tax amount
                product.cost = (product.price / product.quantity) - (product.taxAmount / product.quantity); //cost
                product.subTotal = (product.cost * product.quantity); //Total cost
                product.subTotal = parseFloat(product.subTotal.toFixed(2));
                product.totalPrice = product.subTotal + product.taxAmount; //Total Price
                product.totalPrice = parseFloat(product.totalPrice.toFixed(2)); 
                return product;
              })
            }];
            // Calculate totalSubTotal, grandTotal, grandTotalInWords
            this.shippingCharges = 50;
            const totalSubTotal = this.orderedProducts[0].products.reduce((acc: any, curr: any) => acc + curr.subTotal, 0);
            this.totalSubTotal = totalSubTotal.toFixed(2);
            const totalPrices = this.orderedProducts[0].products.reduce((acc: any, curr: any) => acc + curr.totalPrice, 0);
            this.grandTotal = totalPrices + this.shippingCharges;
            this.grandTotalInWords = this.convertToWords(this.grandTotal);
            // Fetch order address
            this.getOrderAddress(this.orderId);

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

  //Address for that particular order
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


  generatePDF(orderId: string) {
    // Get the hidden container for the invoice content
    const hiddenInvoiceContainer = document.getElementById('hiddenInvoiceContainer') as HTMLElement;
    
    // Convert hidden container content to PDF
    html2canvas(hiddenInvoiceContainer).then((canvas) => {
        // Convert canvas to PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Invoice-atpu.pdf`);
    });
}




  isStatusReached(status: string): boolean {
    // Assuming this.orderStatus holds the current status
    return ['Placed', 'Shipped', 'Enroute', 'Completed'].indexOf(status) <=
      ['Placed', 'Shipped', 'Enroute', 'Completed'].indexOf(this.orderStatus);
  }


  //Number to text
  convertToWords(value: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const suffixes = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    if (value === 0) {
      return 'Zero Rupees Only';
    }

    const chunks = [];
    while (value > 0) {
      chunks.push(value % 1000);
      value = Math.floor(value / 1000);
    }

    const wordsChunks = chunks.map((chunk, index) => {
      if (chunk === 0) {
        return '';
      }

      const chunkStr = chunk.toString();
      const hundreds = ones[Math.floor(chunk / 100)] ? ones[Math.floor(chunk / 100)] + ' Hundred ' : '';
      const tensAndOnes = chunk % 100;
      let tensAndOnesStr = '';

      if (tensAndOnes < 10) {
        tensAndOnesStr = ones[tensAndOnes];
      } else if (tensAndOnes < 20) {
        tensAndOnesStr = teens[tensAndOnes - 10];
      } else {
        tensAndOnesStr = tens[Math.floor(tensAndOnes / 10)] + (tensAndOnes % 10 !== 0 ? '-' + ones[tensAndOnes % 10] : '');
      }

      return hundreds + tensAndOnesStr + ' ' + suffixes[index];
    });

    const words = wordsChunks.reverse().join(' ').trim();
    return words.charAt(0).toUpperCase() + words.slice(1) + ' Rupees Only';
  }

}
