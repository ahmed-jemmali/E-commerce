import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalConstants} from '@app/shared/global-constants';
import {SupplierService} from '@app/services/supplier.service';
import {SupplierCategoryService} from '@app/services/supplier-category.service';
import {BehaviorSubject} from 'rxjs';
import {SupplierCategory} from '@model/supplierCategory.model';
import {Supplier} from '@model/supplier.model';
import {mergeMap, switchMap} from 'rxjs/operators';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierComponent implements OnInit {

  supplierCategories$ = new BehaviorSubject<SupplierCategory[]>([]);
  supplier$ = new BehaviorSubject<Partial<Supplier>>({});
  suppliers$ = new BehaviorSubject<Supplier[]>([]);

  FORM_TYPE = FormType;
  formType = FormType.ADD;

  supplierForm: FormGroup;
  searchValue: string;
  constructor(private formBuilder: FormBuilder,
              private supplierService: SupplierService,
              private supplierCategoryService: SupplierCategoryService) {
  }

  ngOnInit() {
    this.supplierService.getAllSuppliers()
      .subscribe(value => {
        this.suppliers$.next(value);
      });

    this.supplierCategoryService.getAllSupplierCategories().subscribe(this.supplierCategories$);

    this.supplierForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      address: [null, [Validators.required]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      categoryId: [null, [Validators.required]]
    });

  }

  addSupplier() {
    this.supplierService.addSupplier(this.supplier$.value as Supplier)
      .pipe(mergeMap(value => this.supplierService.getAllSuppliers()))
      .subscribe(value => {
        this.suppliers$.next(value);
        this.ngOnInit();
      });
  }

  editSupplier(id: string) {
    this.formType = FormType.EDIT;
    this.supplierService.getSupplierById(id)
      .subscribe(value => {
        this.supplier$.next(value);
      });
  }

  updateSupplier() {
    this.supplierService.updateSupplier(this.supplier$.value as Supplier)
      .pipe(mergeMap(value => this.supplierService.getAllSuppliers()))
      .subscribe(value => {
        this.suppliers$.next(value);
        this.supplierForm.reset();
        this.ngOnInit();
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.supplier$.next({});
    this.ngOnInit();
  }

  deleteSupplier(id: string) {
    this.supplierService.deleteSupplier(id)
      .pipe(switchMap(value => this.supplierService.getAllSuppliers()))
      .subscribe(value => {
        this.suppliers$.next(value);
      });
  }

}
