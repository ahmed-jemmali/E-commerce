import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupplierCategoryService} from '@app/services/supplier-category.service';
import {BehaviorSubject} from 'rxjs';
import {SupplierCategory} from '@model/supplierCategory.model';
import {mergeMap, switchMap} from 'rxjs/operators';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-supplier-category',
  templateUrl: './supplier-category.component.html',
  styleUrls: ['./supplier-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierCategoryComponent implements OnInit {

  supplierCategory$ = new BehaviorSubject<Partial<SupplierCategory>>({});
  supplierCategories$ = new BehaviorSubject<SupplierCategory[]>([]);

  FORM_TYPE = FormType;
  formType = this.FORM_TYPE.ADD;

  supplierCategoryForm: FormGroup;
  searchValue: string;

  constructor(private formBuilder: FormBuilder,
              private supplierCategoryService: SupplierCategoryService) {
  }

  ngOnInit() {
    this.supplierCategoryService.getAllSupplierCategories()
      .subscribe(value => {
        this.supplierCategories$.next(value);
      });

    this.supplierCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  addSupplierCategory() {
    this.supplierCategoryService.addSupplierCategory(this.supplierCategory$.value as SupplierCategory)
      .pipe(mergeMap(value => this.supplierCategoryService.getAllSupplierCategories()))
      .subscribe(value => {
        this.supplierCategories$.next(value);
        this.ngOnInit();
      });
  }

  editSupplierCategory(id: string) {
    this.formType = FormType.EDIT;
    this.supplierCategoryService.getSupplierCategoryById(id)
      .subscribe(value => {
        this.supplierCategory$.next(value);
      });
  }

  updateSupplierCategory() {
    this.supplierCategoryService.updateSupplierCategory(this.supplierCategory$.value as SupplierCategory)
      .pipe(mergeMap(value => this.supplierCategoryService.getAllSupplierCategories()))
      .subscribe(value => {
        this.supplierCategories$.next(value);
        this.supplierCategoryForm.reset();
        this.ngOnInit();
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.supplierCategory$.next({});
    this.ngOnInit();
  }

  deleteSupplierCategory(id: string) {
    this.supplierCategoryService.deleteSupplierCategory(id)
      .pipe(switchMap(value => this.supplierCategoryService.getAllSupplierCategories()))
      .subscribe(value => {
        this.supplierCategories$.next(value);
      });
  }
}
