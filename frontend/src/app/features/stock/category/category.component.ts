import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '@app/services/category.service';
import {BehaviorSubject} from 'rxjs';
import {Category} from '@model/category.model';
import {mergeMap, switchMap} from 'rxjs/operators';

enum FormType {
  ADD,
  EDIT
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  category$ = new BehaviorSubject<Partial<Category>>({});
  FORM_TYPE = FormType;
  formType = this.FORM_TYPE.ADD;
  categories$ = new BehaviorSubject<Category[]>([]);
  categoryForm: FormGroup;
  searchValue: string;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAllCategories()
      .subscribe(value => {
        this.categories$.next(value);
      });

    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

  }

  addCategory() {
    this.categoryService.addCategory(this.category$.value as Category)
      .pipe(mergeMap(value => this.categoryService.getAllCategories()))
      .subscribe(value => {
        this.categories$.next(value);
        this.ngOnInit();
      });
  }

  editCategory(id: string) {
    this.formType = FormType.EDIT;
    this.categoryService.getCategoryById(id)
      .subscribe(value => {
        this.category$.next(value);
      });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category$.value as Category)
      .pipe(mergeMap(value => this.categoryService.getAllCategories()))
      .subscribe(value => {
        this.categories$.next(value);
        this.categoryForm.reset();
        this.ngOnInit();
      });
  }

  deleteCategory(id: any) {
    this.categoryService.deleteCategory(id)
      .pipe(switchMap(value => this.categoryService.getAllCategories()))
      .subscribe(value => {
        this.categories$.next(value);
      });
  }

  cancelEdit() {
    this.formType = FormType.ADD;
    this.category$.next({});
    this.ngOnInit();
  }

}
