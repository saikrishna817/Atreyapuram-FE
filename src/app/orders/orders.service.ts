
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    productOrderId: any;
    orderedProducts: any[] = []; 
    orderIds: any;

    constructor() {
        this.loadOrderIds();
    }

    private loadOrderIds() {
        if (typeof localStorage !== 'undefined') {
            const storedOrderIds = localStorage.getItem('orderIds');
            this.orderIds = storedOrderIds ? JSON.parse(storedOrderIds) : [];
        } else {
            this.orderIds = [];
        }
    }

    private saveOrderIds() {
        localStorage.setItem('orderIds', JSON.stringify(this.orderIds));
    }


    setOrderId(id: any) {
        this.productOrderId = id;
        this.orderIds.push(id);
        this.saveOrderIds();
    }

    getOrderId() {
        return this.orderIds;
    }

}
