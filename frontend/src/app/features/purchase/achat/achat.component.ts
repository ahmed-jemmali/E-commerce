import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '@app/services/snackbar.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {GlobalConstants} from '@app/shared/global-constants';
import {SupplierCategoryService} from '@app/services/supplier-category.service';
import {SupplierService} from '@app/services/supplier.service';
import {saveAs} from 'file-saver';
import {AchatService} from '@app/services/achat.service';
import {ProductAchatService} from '@app/services/product-achat.service';
import {CategoryService} from '@app/services/category.service';
import {BehaviorSubject} from 'rxjs';
import {SupplierCategory} from '@model/supplierCategory.model';
import {Supplier} from '@model/supplier.model';
import {Product} from '@model/product.model';
import {Category} from '@model/category.model';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AchatComponent implements OnInit {

  supplierCategories$ = new BehaviorSubject<SupplierCategory[]>([]);
  suppliers$ = new BehaviorSubject<Supplier[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  productAchats$ = new BehaviorSubject<Product[]>([]);

  dataSource: any = [];
  responseMessage: any;
  totalProduct = 0;

  private quantity: number;

  globalQuantity: any = [];

  manageAchatForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackbarService: SnackbarService,
              private ngxService: NgxUiLoaderService,
              private supplierCategoryService: SupplierCategoryService,
              private supplierService: SupplierService,
              private achatService: AchatService,
              private productAchatService: ProductAchatService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.supplierCategoryService.getAllSupplierCategories().subscribe(this.supplierCategories$);
    this.categoryService.getAllCategories().subscribe(this.categories$);

    this.manageAchatForm = this.formBuilder.group({
      supplierCategory: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      name: [null],
      address: [null],
      contactNumber: [null],

      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
    });
  }


  getSupplierByCategory(data: any) {
    console.log('value : ', data);
    this.supplierService.getSupplierByCategory(data.name)
      .subscribe(value => {
        console.log('getSuppliersByCategory :', value);
        this.suppliers$.next(value);
        this.manageAchatForm.controls['name'].setValue('');
        this.manageAchatForm.controls['address'].setValue('');
        this.manageAchatForm.controls['contactNumber'].setValue('');
      });
  }

  getSupplierDetails(data: any) {
    console.log('value : ', data);
    this.supplierService.getSupplierById(data._id)
      .subscribe(value => {
        this.manageAchatForm.controls['name'].setValue(value.name);
        this.manageAchatForm.controls['address'].setValue(value.address);
        this.manageAchatForm.controls['contactNumber'].setValue(value.contactNumber);
        console.log(value);
      });
  }


  getProductAchatsByCategory(data: any) {
    console.log('value : ', data);
    this.productAchatService.getProductAchatByCategory(data.name)
      .subscribe(value => {
        console.log('getProductAchatsByCategory :', value);
        this.productAchats$.next(value);
        this.manageAchatForm.controls['quantity'].setValue('1');
      });
  }


  getProductAchatDetails(data: any) {
    console.log('value : ', data);
    this.productAchatService.getProductAchatById(data._id)
      .subscribe(value => {
        this.manageAchatForm.controls['quantity'].setValue('1');
        console.log(value);
      });
  }

  setQuantity(value: any) {
    const product = this.manageAchatForm.controls['product'].value;
    const temps = this.manageAchatForm.controls['quantity'].value;
    if (product === null) {
      this.manageAchatForm.controls['quantity'].reset();
    } else {
      if (temps > 0) {
      } else if (temps !== '') {
        this.manageAchatForm.controls['quantity'].setValue('1');
      }
    }
  }

  // setQuantity(value: any) {
  //   var temps = this.manageAchatForm.controls['quantity'].value;
  //   if (temps > 0) {
  //   } else if (temps != '') {
  //     this.manageAchatForm.controls['quantity'].setValue('1');
  //   }
  // }


  validateProductAdd() {
    if (this.manageAchatForm.controls['category'].value === null || this.manageAchatForm.controls['product'].value === null || this.manageAchatForm.controls['paymentMethod'].value === null || this.manageAchatForm.controls['quantity'].value <= 0)
      return true;
    else
      return false;
  }


  validateSubmit() {
    if (this.totalProduct === 0 || this.manageAchatForm.controls['supplierCategory'].value === null || this.manageAchatForm.controls['supplier'].value === null)
      return true;
    else
      return false;
  }

  add() {
    var formData = this.manageAchatForm.value;
    var productName = this.dataSource.find((e: { _id: number; }) => e._id === formData.product._id);
    if (productName === undefined) {
      this.totalProduct = this.totalProduct + 1;
      this.dataSource.push({
        _id: formData.product._id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        paymentMethod: formData.paymentMethod,
      });
      this.dataSource = [...this.dataSource];
      console.log('dataSource : ', this.dataSource);
      // this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'success');

      const productQuantity = {
        _id: formData.product._id,
        quantity: formData.product.quantity + Number(formData.quantity),
      };
      this.globalQuantity.push(productQuantity);
      console.log('globalQuantity : ', this.globalQuantity);
      /*this.quantity = formData.product.quantity + Number(formData.quantity);
      console.log('quantity add : ', this.quantity);
      this.productAchatService.updateProductAchat({...formData.product, quantity: this.quantity})
        .subscribe(value => {
          console.log(value);
        });*/
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }


  handleDeleteAction(value: any, element: any) {
    console.log('value :', value);
    console.log('element:', element);
    this.totalProduct = this.totalProduct - 1;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];

    this.globalQuantity.splice(value, 1);
    this.globalQuantity = [...this.globalQuantity];
    console.log('globalQuantity : ', this.globalQuantity);
    /*var formData = this.manageAchatForm.value;
    this.quantity = this.quantity - Number(element.quantity);
    console.log('quantity delete : ', this.quantity);
    this.productAchatService.updateProductAchat({...formData.product, quantity: this.quantity})
      .subscribe(data => {
        console.log(data);
      });*/
  }

  submitAction() {
    this.ngxService.start();
    var formData = this.manageAchatForm.value;
    var data = {
      name: formData.name,
      address: formData.address,
      contactNumber: formData.contactNumber,
      email: formData.supplier.email,
      supplierCategory: formData.supplierCategory.name,

      totalProduct: this.totalProduct,
      productDetails: JSON.stringify(this.dataSource)
    };

    this.productAchatService.updateProductQuantity(this.globalQuantity)
      .subscribe(value => {
        this.globalQuantity = [];
        console.log(this.globalQuantity);
      });

    this.achatService.generateReport(data).subscribe(
      (response: any) => {
        this.downloadFile(response.uuid);
        this.manageAchatForm.reset();
        this.dataSource = [];
        this.totalProduct = 0;

      },
      (error: any) => {
        console.log('Error :', error);
        this.ngxService.stop();
        if (error.error.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }


  downloadFile(fileName: any) {
    var data = {
      uuid: fileName
    };
    this.achatService.getPDF(data).subscribe(
      (response: any) => {
        saveAs(response, fileName + '.pdf');
        this.ngxService.stop();
      });
  }
}
