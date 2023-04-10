import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from 'src/app/models/product.model'

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent {
  @Input() fullwidthmode: boolean = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined;

  onAddToClick(): void {
    this.addToCart.emit(this.product);
  }
}
