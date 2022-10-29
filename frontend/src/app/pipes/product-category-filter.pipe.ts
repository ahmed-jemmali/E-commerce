import {Pipe, PipeTransform} from '@angular/core';
import {Category} from '@model/category.model';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(productCategories: Category[], searchValue: string): Category[] {
    if (!productCategories || !searchValue) {
      return productCategories;
    }
    return productCategories.filter(productCategory =>
      productCategory.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
