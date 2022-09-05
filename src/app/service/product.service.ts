import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "http://localhost:3000/products/";
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  getProductDetail(id:number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}${id}`);
  }

  createProduct(product:Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product, this.httpOptions)
    .pipe(tap((product:Product) => console.log(`Đã thêm sản phẩm w/ ${product.name}, id=${product.id}`)));
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.url + id);
  }

  editProduct(product: Product): Observable<any> {
    return this.httpClient.put(this.url + product.id, product)
  }

  findByName(name: string): Observable<any> {
    return this.httpClient.get(`${this.url}?name=${name}`);
  }
}
