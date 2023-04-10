import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private _cartService: CartService) {}

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];
  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(item: Array<CartItem>) {
    return this._cartService.getTotal(item);
  }
  onClearCart() {
    return this._cartService.clearCart();
  }
  onRemove(item: CartItem) {
    return this._cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem) {
    return this._cartService.addToCart(item);
  }

  onRemoveQuantity(item : CartItem) {
    return this._cartService.removeQuantity(item);
  }
}
