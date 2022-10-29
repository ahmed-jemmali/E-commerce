import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAchatComponent } from './product-achat.component';

describe('ProductAchatComponent', () => {
  let component: ProductAchatComponent;
  let fixture: ComponentFixture<ProductAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
