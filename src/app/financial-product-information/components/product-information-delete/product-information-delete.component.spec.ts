import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import ProductInformationDeleteComponent from './product-information-delete.component';
import { ActivatedRoute } from '@angular/router';
import { FinancialProductService } from '../../services/financial-product.service'; // Importa el servicio
import { of, throwError } from 'rxjs';

describe('ProductInformationDeleteComponent', () => {
  let component: ProductInformationDeleteComponent;
  let fixture: ComponentFixture<ProductInformationDeleteComponent>;
  let service: FinancialProductService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ ProductInformationDeleteComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'your-test-id' }) // Simulated route parameters
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new FinancialProductService(httpClientSpy as any);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductInformationDeleteComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
});
