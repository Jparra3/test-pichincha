import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FinancialProductService } from './financial-product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpClientSpy: {
    get: jasmine.Spy ; post: jasmine.Spy
};
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [FinancialProductService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    service = new FinancialProductService(httpClientSpy as any);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Deberia retornar error 400`, (done: DoneFn) => {

    const mockPrducts: Product = new Product({
      id: '123',
      name: 'Product',
      description: 'Description',
      logo: 'Logo',
      date_release: '24/08/2023',
      date_revision: '25/08/2023',
    })

    const error400 = new HttpErrorResponse({
      error: "Bad Request",
      status: 400,
    })

    httpClientSpy.post.and.returnValue(throwError(error400))

    service.create(mockPrducts)
      .subscribe(
        {
          next: ()=>{ },
          error: (error)=>{
            expect(error.status).toEqual(400);
            done()
          }
        }
      )

  });

  it('debe recuperar productos a través de la solicitud GET', () => {
    const mockProducts: Product[] = [
    ];

    httpClientSpy.get.and.returnValue(of(mockProducts));

    service.search().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

  });

});
