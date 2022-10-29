import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '@app/services/category.service';
import {GlobalConstants} from '@app/shared/global-constants';
import {ProductAchatService} from '@app/services/product-achat.service';
import {BehaviorSubject} from 'rxjs';
import {Product} from '@model/product.model';
import {Category} from '@model/category.model';
import {mergeMap, switchMap} from 'rxjs/operators';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-product-achat',
  templateUrl: './product-achat.component.html',
  styleUrls: ['./product-achat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAchatComponent implements OnInit {

  categories$ = new BehaviorSubject<Category[]>([]);
  productAchat$ = new BehaviorSubject<Partial<Product>>({});
  productAchats$ = new BehaviorSubject<Product[]>([]);

  FORM_TYPE = FormType;
  formType = FormType.ADD;

  productAchatForm: FormGroup;
  searchValue: string;

  constructor(private formBuilder: FormBuilder,
              private productAchatService: ProductAchatService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.productAchatService.getAllProductAchats()
      .subscribe(value => {
        this.productAchats$.next(value);
      });

    this.categoryService.getAllCategories().subscribe(this.categories$);

    this.productAchatForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      description: [null, [Validators.required]],
    });

  }

  addProductAchat() {
    this.productAchatService.addProductAchat(this.productAchat$.value as Product)
      .pipe(mergeMap(value => this.productAchatService.getAllProductAchats()))
      .subscribe(value => {
        this.productAchats$.next(value);
        this.ngOnInit();
      });
  }

  editProductAchat(id: string) {
    this.formType = FormType.EDIT;
    this.productAchatService.getProductAchatById(id)
      .subscribe(value => {
        this.productAchat$.next(value);
      });
  }

  updateProductAchat() {
    this.productAchatService.updateProductAchat(this.productAchat$.value as Product)
      .pipe(mergeMap(value => this.productAchatService.getAllProductAchats()))
      .subscribe(value => {
        this.productAchats$.next(value);
        this.productAchatForm.reset();
        this.ngOnInit();
      });
  }

  deleteProductAchat(id: string) {
    this.productAchatService.deleteProductAchat(id)
      .pipe(switchMap(value => this.productAchatService.getAllProductAchats()))
      .subscribe(value => {
        this.productAchats$.next(value);
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.productAchat$.next({});
    this.ngOnInit();
  }

  changeStatus(product: Product, status: boolean) {
    console.log(status);
    this.productAchatService.updateProductAchat({...product, status})
      .pipe(mergeMap(value => this.productAchatService.getAllProductAchats()))
      .subscribe(value => {
        this.productAchats$.next(value);
      });
  }

  checkQuantity(quantity: number) {
    return quantity > 0;
  }

}
