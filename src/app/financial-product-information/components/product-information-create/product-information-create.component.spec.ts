import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationCreateComponent } from './product-information-create.component';

describe('ProductInformationCreateComponent', () => {
  let component: ProductInformationCreateComponent;
  let fixture: ComponentFixture<ProductInformationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInformationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
