import { Component, Input } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  _cart: Cart = { items: [] };
  itemsQuantity: number = 0;
  constructor(private _cartService: CartService) {}
  @Input()
  get cart(): Cart {
    return this._cart;
  }


  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }
  getTotal(item: Array<CartItem>): number {
    return this._cartService.getTotal(item);
  }
  onClearCart() {
    return this._cartService.clearCart();
  }
}
