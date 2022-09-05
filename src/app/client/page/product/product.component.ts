
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { Product } from 'src/app/model/product.model';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService
  ) { }
  userLogin: any;
  products: Product[] = [];
  order: Order = new Order;
  name: any;
  p: number = 1;
  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  searchByName() {
    if (this.name == "") {
      this.ngOnInit();
    } else {
      this.products = this.products.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  buyNow(product: Product) {
    if (this.checkLogin()) {
      let oldProduct = this.checkExits(product);
      if (oldProduct) {
        oldProduct.quantity += 1;
      } else {
        product.quantity = 1;
        this.order.carts.push(product);
      }
      this.calcCart();

      alert('Thêm sản phẩm thành công');
    }
    else {
      alert("Phải đăng nhập vào trước khi thêm sản phẩm");
      this.router.navigate(['client/login']);
    }
  }

  createOrder()
  {
    this.order.customer.name = this.userLogin.fullname;
    this.order.customer.phone = this.userLogin.phone;  
    this.order.customer.address = "HCM";

    this.orderService.createOrder(this.order);
    this.order = new Order;
    alert('Thanh toán thành công')
  }

  checkLogin() {
    let currentUser = localStorage.getItem("UserLogin");
    if (currentUser && currentUser.length > 0) {
      this.userLogin = JSON.parse(currentUser);
      return true;
    }
    return false;
  }

  checkExits(product: Product) {
    for (let i = 0; i < this.order.carts.length; i++) {
      const element = this.order.carts[i];
      if (product.id == element.id) {
        return product;
      }
    }
    return false;
  }

  calcCart() {
    let total = 0;
    for (let i = 0; i < this.order.carts.length; i++) {
      const element = this.order.carts[i];
      total = total + (element.quantity * element.price);
    }
    this.order.totalAmount = total;
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
