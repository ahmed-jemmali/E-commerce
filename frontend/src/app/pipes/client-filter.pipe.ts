import {Pipe, PipeTransform} from '@angular/core';
import {Client} from '@model/client.model';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(clients: Client[], searchValue: string): Client[] {
    if (!clients || !searchValue) {
      return clients;
    }
    return clients.filter(client =>
      client.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      client.address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      client.contactNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      client.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }


}
