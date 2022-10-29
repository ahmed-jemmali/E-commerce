import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'saleInvoiceFilter'
})
export class SaleInvoiceFilterPipe implements PipeTransform {

  transform(objs: any, searchValue: string): any {
    if (!objs || !searchValue) {
      return objs;
    }
    return objs.filter(obj =>
      obj.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.contactNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.paymentMethod.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.total.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
