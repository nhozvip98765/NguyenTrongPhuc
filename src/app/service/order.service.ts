import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  KEY = 'N1ORDER';
  constructor(private httpClient: HttpClient) { }

  createOrder(order: Order) {
    order.id = Date.now() / 1000 | 0;
    let listOrder = this.getAllOrder();
    listOrder.push(order);
    localStorage.setItem(this.KEY, JSON.stringify(listOrder));
  }
  getAllOrder() {
    try {
      let strOrder = localStorage.getItem(this.KEY);
      if (strOrder && strOrder != "") {
        return JSON.parse(strOrder);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
}
