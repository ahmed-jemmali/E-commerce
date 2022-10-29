import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFacturesAchatComponent } from './all-factures-achat.component';

describe('AllFacturesAchatComponent', () => {
  let component: AllFacturesAchatComponent;
  let fixture: ComponentFixture<AllFacturesAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFacturesAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFacturesAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
