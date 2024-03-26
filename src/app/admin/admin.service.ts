import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    productOrderId: any;
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
        // Add the new order ID to the array
        this.orderIds.push(id);
        console.log(this.orderIds,'order ids in admin service')
        // Save the updated order IDs in local storage
        this.saveOrderIds();
        console.log(this.productOrderId, 'set idddd');
    }

    getOrderId() {
        console.log(this.orderIds, 'get iddd');
        return this.orderIds;
    }

}
