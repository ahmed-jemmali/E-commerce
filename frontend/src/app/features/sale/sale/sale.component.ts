import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {saveAs} from 'file-saver';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {CategoryService} from '@app/services/category.service';
import {ProductService} from '@app/services/product.service';
import {SnackbarService} from '@app/services/snackbar.service';
import {VenteService} from '@app/services/vente.service';
import {GlobalConstants} from '@app/shared/global-constants';
import {BehaviorSubject} from 'rxjs';
import {Category} from '@model/category.model';
import {Product} from '@model/product.model';
import {Client} from '@model/client.model';
import {ClientService} from '@app/services/client.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  categories$ = new BehaviorSubject<Category[]>([]);
  products$ = new BehaviorSubject<Product[]>([]);
  clients$ = new BehaviorSubject<Client[]>([]);

  dataSource: any = [];
  price: any;
  totalAmount = 0;
  responseMessage: any;

  private quantity = 0;

  globalQuantity: any = [];

  manageVenteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private productService: ProductService,
              private venteService: VenteService,
              private router: Router,
              private snackbarService: SnackbarService,
              private ngxService: NgxUiLoaderService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(this.clients$);
    this.categoryService.getAllCategories().subscribe(this.categories$);

    this.manageVenteForm = this.formBuilder.group({
      client: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      name: [null],
      contactNumber: [null],
      address: [null],
      paymentMethod: [null, [Validators.required]],

      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    });
  }

  getClientDetails(data: any) {
    console.log('value : ', data);
    this.clientService.getClientById(data._id)
      .subscribe(value => {
        this.manageVenteForm.controls['name'].setValue(value.name);
        this.manageVenteForm.controls['address'].setValue(value.address);
        this.manageVenteForm.controls['contactNumber'].setValue(value.contactNumber);
        console.log(value);
      });
  }

  getProductsByCategory(data: any) {
    console.log('data : ', data);
    this.productService.getProductByCategory(data.name)
      .subscribe(value => {
        console.log('getProductsByCategory :', value);
        this.products$.next(value);
        this.manageVenteForm.controls['price'].setValue('');
        this.manageVenteForm.controls['quantity'].setValue('1');
        this.manageVenteForm.controls['total'].setValue(0);
      });
  }


  getProductDetails(data: any) {
    console.log('value : ', data);
    this.productService.getProductById(data._id)
      .subscribe(value => {
        this.price = value.price;
        this.manageVenteForm.controls['price'].setValue(value.price);
        this.manageVenteForm.controls['quantity'].setValue('1');
        this.manageVenteForm.controls['total'].setValue(this.price * 1);
        console.log(value);
      });
  }


  setQuantity(value: any) {
    const product = this.manageVenteForm.controls['product'].value;
    const temps = this.manageVenteForm.controls['quantity'].value;
    if (product === null) {
      this.manageVenteForm.controls['quantity'].reset();
    } else {
      const quantity = this.manageVenteForm.value.product.quantity;
      if (0 < temps && temps <= quantity) {
        this.manageVenteForm.controls['total'].setValue(this.manageVenteForm.controls['quantity'].value * this.manageVenteForm.controls['price'].value);
      } else if (temps > quantity) {
        this.manageVenteForm.controls['quantity'].setValue(quantity);
        this.manageVenteForm.controls['total'].setValue(this.manageVenteForm.controls['quantity'].value * this.manageVenteForm.controls['price'].value);
      } else if (temps !== '') {
        this.manageVenteForm.controls['quantity'].setValue('1');
        this.manageVenteForm.controls['total'].setValue(this.manageVenteForm.controls['quantity'].value * this.manageVenteForm.controls['price'].value);
      }
    }
  }

  // setQuantity(value: any) {
  //   const temps = this.manageVenteForm.controls['quantity'].value;
  //   if (0 < temps) {
  //     this.manageVenteForm.controls['total'].setValue(this.manageVenteForm.controls['quantity'].value * this.manageVenteForm.controls['price'].value);
  //   }  else if (temps !== '') {
  //     this.manageVenteForm.controls['quantity'].setValue('1');
  //     this.manageVenteForm.controls['total'].setValue(this.manageVenteForm.controls['quantity'].value * this.manageVenteForm.controls['price'].value);
  //   }
  // }


  validateProductAdd() {
    if (this.manageVenteForm.controls['category'].value === null || this.manageVenteForm.controls['product'].value === null || this.manageVenteForm.controls['total'].value === 0 || this.manageVenteForm.controls['total'].value === null || this.manageVenteForm.controls['quantity'].value <= 0)
      return true;
    else
      return false;
  }


  validateSubmit() {
    if (this.totalAmount === 0 || this.manageVenteForm.controls['client'].value === null || this.manageVenteForm.controls['paymentMethod'].value === null)
      return true;
    else
      return false;
  }


  add() {
    const formData = this.manageVenteForm.value;
    const productName = this.dataSource.find((e: { _id: number; }) => e._id === formData.product._id);
    if (productName === undefined) {
      console.log('formData.product._id', formData.product._id);
      this.totalAmount = this.totalAmount + formData.total;
      const product = {
        _id: formData.product._id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      };
      this.dataSource.push(product);

      const productQuantity = {
        _id: formData.product._id,
        quantity: formData.product.quantity - Number(formData.quantity),
      };
      this.globalQuantity.push(productQuantity);
      console.log('globalQuantity : ', this.globalQuantity);

      /*this.quantity = formData.product.quantity - Number(formData.quantity);
      console.log('quantity1 : ', this.quantity);
      this.productService.updateProduct({...formData.product, quantity: this.quantity})
        .subscribe(value => {
          console.log(value);
          console.log('quantity2 : ', this.quantity);
        });
      console.log('quantity3 : ', this.quantity);*/
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }


  handleDeleteAction(value: any, element: any) {
    console.log('value :', value);
    console.log('element:', element);
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];

    this.globalQuantity.splice(value, 1);
    this.globalQuantity = [...this.globalQuantity];
    console.log('globalQuantity : ', this.globalQuantity);

    /*const formData = this.manageVenteForm.value;
    this.quantity = this.quantity + Number(element.quantity);
    console.log('quantity delete : ', this.quantity);
    this.productService.updateProduct({...formData.product, quantity: this.quantity})
      .subscribe(data => {
        console.log(data);
      });*/
  }


  submitAction() {
    this.ngxService.start();
    const formData = this.manageVenteForm.value;
    const data = {
      name: formData.name,
      email: formData.client.email,
      address: formData.address,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    };

    this.productService.updateProductQuantity(this.globalQuantity)
      .subscribe(value => {
        this.globalQuantity = [];
        console.log(this.globalQuantity);
      });

    this.venteService.generateReport(data).subscribe(
      (response: any) => {
        this.downloadFile(response.uuid);
        this.manageVenteForm.reset();
        this.dataSource = [];
        this.totalAmount = 0;
      },
      (error: any) => {
        console.log('error :', error);
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
    const data = {
      uuid: fileName
    };
    this.venteService.getPDF(data).subscribe(
      (response: any) => {
        saveAs(response, fileName + '.pdf');
        this.ngxService.stop();
      });
  }

}
