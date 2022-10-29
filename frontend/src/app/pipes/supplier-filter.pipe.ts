import {Pipe, PipeTransform} from '@angular/core';
import {Supplier} from '@model/supplier.model';

@Pipe({
  name: 'supplierFilter'
})
export class SupplierFilterPipe implements PipeTransform {

  transform(suppliers: Supplier[], searchValue: string): Supplier[] {
    if (!suppliers || !searchValue) {
      return suppliers;
    }
    return suppliers.filter(supplier =>
      supplier.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      supplier.address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      supplier.contactNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      supplier.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      supplier.categoryId.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
