import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
const BASE_URL = "https://fakestoreapi.com";
@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(
    limit = 12,
    sort = "desc",
    category?:string
  ): Observable<Array<Product>> {
    console.log(category);
    return this._httpClient.get<Array<Product>>(
      `${BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}$limit=${limit}`
    );
  }
  getAllCategories(): Observable<Array<string>> {
    return this._httpClient.get<Array<string>>(
      `${BASE_URL}/products/categories`
    );
  }
}
