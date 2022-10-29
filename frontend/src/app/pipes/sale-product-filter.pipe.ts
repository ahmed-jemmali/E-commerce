import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '@model/product.model';

@Pipe({
  name: 'saleProductFilter'
})
export class SaleProductFilterPipe implements PipeTransform {

  transform(saleProducts: Product[], searchValue: string): Product[] {
    if (!saleProducts || !searchValue) {
      return saleProducts;
    }
    return saleProducts.filter(saleProduct =>
      saleProduct.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      saleProduct.categoryId.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      saleProduct.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      saleProduct.price.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      saleProduct.quantity.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
