import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from '../../../shared/global-constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Client} from '@model/client.model';
import {ClientService} from '../../../services/client.service';
import {mergeMap, switchMap} from 'rxjs/operators';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client$ = new BehaviorSubject<Partial<Client>>({});
  clients$ = new BehaviorSubject<Client[]>([]);

  FORM_TYPE = FormType;
  formType = FormType.ADD;

  clientForm: FormGroup;
  searchValue: string;
  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getAllClients()
      .subscribe(value => {
        this.clients$.next(value);
      });

    this.clientForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      address: [null, [Validators.required]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    });
  }

  addClient() {
    this.clientService.addClient(this.client$.value as Client)
      .pipe(mergeMap(value => this.clientService.getAllClients()))
      .subscribe(value => {
        this.clients$.next(value);
        this.ngOnInit();
      });
  }

  editClient(id: string) {
    this.formType = FormType.EDIT;
    this.clientService.getClientById(id)
      .subscribe(value => {
        this.client$.next(value);
      });
  }

  updateClient() {
    this.clientService.updateClient(this.client$.value as Client)
      .pipe(mergeMap(value => this.clientService.getAllClients()))
      .subscribe(value => {
        this.clients$.next(value);
        this.clientForm.reset();
        this.ngOnInit();
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.client$.next({});
    this.ngOnInit();
  }

  deleteSupplier(id: string) {
    this.clientService.deleteClient(id)
      .pipe(switchMap(value => this.clientService.getAllClients()))
      .subscribe(value => {
        this.clients$.next(value);
      });
  }

}
