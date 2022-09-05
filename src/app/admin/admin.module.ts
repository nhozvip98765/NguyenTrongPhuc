import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PagesComponent } from './pages/pages.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminRoutingModule } from './admin.routing';
import { ProductService } from '../service/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './pages/order/order.component';



@NgModule({
  declarations: [
    LayoutComponent,
    PagesComponent,
    ProductComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService]
})
export class AdminModule { }
