import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationDeleteComponent } from './product-information-delete.component';

describe('ProductInformationDeleteComponent', () => {
  let component: ProductInformationDeleteComponent;
  let fixture: ComponentFixture<ProductInformationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInformationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
