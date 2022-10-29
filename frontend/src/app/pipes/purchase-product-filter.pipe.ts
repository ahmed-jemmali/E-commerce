import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '@model/product.model';

@Pipe({
  name: 'purchaseProductFilter'
})
export class PurchaseProductFilterPipe implements PipeTransform {

  transform(purchaseProducts: Product[], searchValue: string): Product[] {
    if (!purchaseProducts || !searchValue) {
      return purchaseProducts;
    }
    return purchaseProducts.filter(purchaseProduct =>
      purchaseProduct.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      purchaseProduct.categoryId.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      purchaseProduct.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      purchaseProduct.quantity.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
