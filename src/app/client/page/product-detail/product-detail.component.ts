import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  product: any;
  order:Order = new Order;
  id:any;

  getDetail(id:any) {
    this.productService.getProductDetail(id).subscribe((res) => {
      this.product = res;
    })
  }

  buyNow(product:Product)
  {
    let oldProduct = this.checkExits(product);
    if(oldProduct)
    {
      oldProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.order.carts.push(product);
    }
    this.calcCart();

    alert('Thêm sản phẩm thành công');
  }

  checkExits(product:Product)
  {
    for(let i = 0; i < this.order.carts.length; i++)
    {
      const element = this.order.carts[i];
      if(product.id == element.id)
      {
        return product;
      }
    }
    return false;
  }

  calcCart() {
    let total = 0;
    for (let i = 0; i < this.order.carts.length; i++)
    {
      const element = this.order.carts[i];
      total = total + (element.quantity*element.price);
    }
    this.order.totalAmount = total;
  }

  ngOnInit(): void {
   this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
   });
   this.getDetail(this.id);
  }

}
