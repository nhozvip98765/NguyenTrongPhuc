import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  listOrder: Order[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.listOrder = this.orderService.getAllOrder();
  }


}
