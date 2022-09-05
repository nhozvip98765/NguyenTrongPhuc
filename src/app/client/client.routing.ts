import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { ProductComponent } from './page/product/product.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    {
        path: "client",
        component: LayoutComponent,
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
                path: "product/:id",
                component: ProductDetailComponent
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
