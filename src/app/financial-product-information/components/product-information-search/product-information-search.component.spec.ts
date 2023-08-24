import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductInformationSearchComponent } from './product-information-search.component';


describe('ProductInformationSearchComponent', () => {
  let component: ProductInformationSearchComponent;
  let fixture: ComponentFixture<ProductInformationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ ProductInformationSearchComponent ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductInformationSearchComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
});
