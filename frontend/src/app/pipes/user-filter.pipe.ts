import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(objs: any, searchValue: string): any {
    if (!objs || !searchValue) {
      return objs;
    }
    return objs.filter(obj =>
      obj.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.phone.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      obj.role.find(data =>
      data.role.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())));
  }

}
