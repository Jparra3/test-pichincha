import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FinancialProductService } from './financial-product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new FinancialProductService(httpClientSpy as any);
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

  })
});
