import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class Order {
    id:number = 0;
    totalAmount:number = 0;
    method:string = "Tại cửa hàng";
    customer: Customer = new Customer;
    carts:Product [] = [];
    showChild:boolean = false;
}