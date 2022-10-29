import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '@app/services/category.service';
import {ProductService} from '@app/services/product.service';
import {GlobalConstants} from '@app/shared/global-constants';
import {BehaviorSubject} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {Product} from '@model/product.model';
import {Category} from '@model/category.model';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  product$ = new BehaviorSubject<Partial<Product>>({});
  products$ = new BehaviorSubject<Product[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);

  FORM_TYPE = FormType;
  formType = FormType.ADD;

  productForm: FormGroup;
  searchValue: string;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe(value => {
        this.products$.next(value);
      });

    this.categoryService.getAllCategories().subscribe(this.categories$);

    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.pattern(GlobalConstants.numberRegex)]],

    });
  }

  addProduct() {
    this.productService.addProduct(this.product$.value as Product)
      .pipe(mergeMap(value => this.productService.getAllProducts()))
      .subscribe(value => {
        this.products$.next(value);
        this.ngOnInit();
      });
  }

  editProduct(id: string) {
    this.formType = FormType.EDIT;
    this.productService.getProductById(id)
      .subscribe(value => {
        this.product$.next(value);
      });
  }

  updateProduct() {
    this.productService.updateProduct(this.product$.value as Product)
      .pipe(mergeMap(value => this.productService.getAllProducts()))
      .subscribe(value => {
        this.products$.next(value);
        this.productForm.reset();
        this.ngOnInit();
      });
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id)
      .pipe(switchMap(value => this.productService.getAllProducts()))
      .subscribe(value => {
        this.products$.next(value);
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.product$.next({});
    this.ngOnInit();
  }

  changeStatus(product: Product, status: boolean, event) {
    console.log(event);
    this.productService.updateProduct({...product, status})
      .pipe(mergeMap(value => this.productService.getAllProducts()))
      .subscribe(value => {
        this.products$.next(value);
      });
  }
}



