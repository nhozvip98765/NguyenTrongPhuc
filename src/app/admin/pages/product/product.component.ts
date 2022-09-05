
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.productForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
      quantity: ["", Validators.required]
    });
  }
  productForm: FormGroup;
  product = {
    name: '',
    description: '',
    image: '../assets/images/',
    price: '',
    quantity: '',
    id: null
  }
  edit = true;
  add = false;
  products: Product[] = [];
  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  createProducts(newProduct: Product) {
    this.productService.createProduct(newProduct).subscribe(product => {
      this.products.push(product);
      this.showSuccess();
    });
    this.productForm.reset();
  }

  showSuccess() {
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].id + ' ' + this.products[i].name);
    }
    this.toastr.success('', "Thêm thành công sản phẩm", { 'progressBar': true, timeOut: 4000 });
  }

  showSuccessUpdate() {
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].id + ' ' + this.products[i].name);
    }
    this.toastr.success(`${this.product.name}`, "Update thành công sản phẩm", { 'progressBar': true, timeOut: 4000 });
  }

  showSuccessDelete() {
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].id + ' ' + this.products[i].name);
    }
    this.toastr.error('', "Xóa thành công sản phẩm", { 'progressBar': true, timeOut: 4000 });
  }

  deleteProduct(id: number) {{
    console.log(id);
    this.productService.deleteProduct(id).subscribe(product => {
      alert('Bạn có chắc muốn xóa!');
      this.showSuccessDelete();
      this.getProducts();
    })
  }}

  setProductEdit(product: Product) {
    this.product.name = product.name;
    this.product.description = product.description;
    this.product.image = product.image;
    this.product.price = product.price;
    this.product.quantity = product.quantity;
    this.product.id = product.id;
    this.edit = false;
    this.add = true;
  }

  resetValues() {
    this.product.name = "";
    this.product.description = "";
    this.product.image = "../assets/images/";
    this.product.price = "";
    this.product.quantity = "";
    this.product.id = null;
    this.edit = true;
    this.add = false;
  }

  updateProduct(){
    this.productService.editProduct(this.product).subscribe(response => console.log(response));
    this.showSuccessUpdate();
    this.getProducts()
    this.resetValues()
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => (this.products = products));
  }


}
