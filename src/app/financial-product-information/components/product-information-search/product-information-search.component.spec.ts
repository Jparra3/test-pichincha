import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationSearchComponent } from './product-information-search.component';

describe('ProductInformationSearchComponent', () => {
  let component: ProductInformationSearchComponent;
  let fixture: ComponentFixture<ProductInformationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInformationSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
