import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationUpdateComponent } from './product-information-update.component';

describe('ProductInformationUpdateComponent', () => {
  let component: ProductInformationUpdateComponent;
  let fixture: ComponentFixture<ProductInformationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInformationUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
