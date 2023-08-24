import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInformationCreateComponent } from './product-information-create.component';
import { of, throwError } from 'rxjs';

import { FinancialProductService } from '../../services/financial-product.service'; // Importa el servicio


describe('ProductInformationCreateComponent', () => {
  let component: ProductInformationCreateComponent;
  let fixture: ComponentFixture<ProductInformationCreateComponent>;
  let service: FinancialProductService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ ProductInformationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInformationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new FinancialProductService(httpClientSpy as any);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductInformationCreateComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(ProductInformationCreateComponent);
    const app = fixture.componentInstance
    fixture.detectChanges() //TODO: <---------------

    const id = app.form.controls['id']
    id.setValue('')

    const name = app.form.controls['name']
    id.setValue('Tarjetas de Crédito')

    const description = app.form.controls['description']
    description.setValue('Tarjeta de consumo bajo la modalidad de crédito')

    const logo = app.form.controls['logo']
    description.setValue('https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg')

    const dateRelease = app.form.controls['dateRelease']
    description.setValue('25/08/2023')

    expect(app.form.invalid).toBeTrue(); //TODO: ✔
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(ProductInformationCreateComponent);
    const app = fixture.componentInstance
    fixture.detectChanges() //TODO: <---------------

    const id = app.form.controls['id']
    id.setValue('trj-crd')

    const name = app.form.controls['name']
    id.setValue('Tarjetas de Crédito')

    const description = app.form.controls['description']
    description.setValue('Tarjeta de consumo bajo la modalidad de crédito')

    const logo = app.form.controls['logo']
    description.setValue('https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg')

    const dateRelease = app.form.controls['dateRelease']
    description.setValue('25/08/2026')

    expect(app.form.invalid).toBeTrue(); //TODO: ✔
  });

  it('debe configurar dateRevision correctamente cuando se llama a validarDateRelease', () => {
    component.form.get('dateRelease')?.setValue('25/08/2026');
    component.validateDateRelease();

    expect(component.form.get('dateRevision')?.value).toBe('25/08/2027');
  });

  it('Debe establecer dateRevision en vacío cuando dateRelease no es válido', () => {
    component.form.get('dateRelease')?.setValue('invalid-date');
    component.validateDateRelease();

    expect(component.form.get('dateRevision')?.value).toBe('');
  });

  /* it('Debe retornar false cuando no se guarda', fakeAsync(() => {
    const formValue = {
      id: '123',
      name: 'Product',
      description: 'Description',
      logo: 'Logo',
      dateRelease: '24/08/2023',
      dateRevision: '25/08/2023',
    };

    httpClientSpy.post.and.throwError('error');

    component.form.setValue(formValue);
    component.save();

    expect(component.isSave).toBe(false);
    expect(component.message).toBe('Ocurrio un error');
  })); */
});
