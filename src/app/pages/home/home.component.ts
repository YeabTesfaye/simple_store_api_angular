import { CartService } from "./../../services/cart.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";
const ROWS_HIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols: number = 3;
  rowHight = ROWS_HIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort: string = "desc";
  count: number = 12;
  productSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_product) => {
        this.products = _product;
      });
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    // this.rowHight = ROWS_HIGHT[this.cols];
    this.getProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChnage(newCount: number): void {
    this.count = newCount;
    this.getProducts()
  }
  onSortChnage(newSort: string) : void {
    this.sort = newSort;
    this.getProducts()
  }
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe;
    }
  }
}
