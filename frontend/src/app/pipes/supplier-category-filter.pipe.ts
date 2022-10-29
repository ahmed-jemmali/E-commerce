import {Pipe, PipeTransform} from '@angular/core';
import {SupplierCategory} from '@model/supplierCategory.model';

@Pipe({
  name: 'supplierCategoryFilter'
})
export class SupplierCategoryFilterPipe implements PipeTransform {

  transform(supplierCategories: SupplierCategory[], searchValue: string): SupplierCategory[] {
    if (!supplierCategories || !searchValue) {
      return supplierCategories;
    }
    return supplierCategories.filter(supplierCategory =>
      supplierCategory.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
