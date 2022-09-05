import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
    {
        path: "admin",
        component: LayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "",
                redirectTo: "product",
                pathMatch: "full"
            },
            {
                path: "product",
                component: ProductComponent
            },
            {
                path: "order",
                component: OrderComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
