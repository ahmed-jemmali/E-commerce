import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFacturesComponent } from './all-factures.component';

describe('AllFacturesComponent', () => {
  let component: AllFacturesComponent;
  let fixture: ComponentFixture<AllFacturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFacturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
