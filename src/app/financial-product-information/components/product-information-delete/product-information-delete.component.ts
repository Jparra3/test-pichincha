import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { FinancialProductService } from '../../services/financial-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../models/response-api';
import { ResponseServiceService } from '../../services/response-service.service';

@Component({
  selector: 'app-product-information-delete',
  templateUrl: './product-information-delete.component.html',
  styleUrls: ['./product-information-delete.component.scss']
})
export default class ProductInformationDeleteComponent implements OnInit {

  form: FormGroup;
  dto: Product;
  sendSave: boolean = false;
  isSave!: boolean | undefined;
  message: string = '';
  disabledBtnDelete: boolean = false;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private financialProductService: FinancialProductService,
    private route: ActivatedRoute,
    private responseServiceService: ResponseServiceService,
    private router: Router
  ){

    this.dto = new Product({});
    this.form = this.createForm();

  }

  ngOnInit() {
    const tmpDto = this.financialProductService.getData();
    if(tmpDto != undefined){
      this.dto = new Product(tmpDto);

      if(tmpDto.name != undefined){
        this.dto.name = tmpDto.name;
        this.form.get('name')?.setValue(this.dto.name);
      }

      if(tmpDto.description != undefined){
        this.dto.description = tmpDto.description;
        this.form.get('description')?.setValue(this.dto.description);
      }

      if(tmpDto.logo != undefined){
        this.dto.logo = tmpDto.logo;
        this.form.get('logo')?.setValue(this.dto.logo);
      }

      if(tmpDto.date_release != undefined){
        this.dto.date_release = this.getDate(new Date(tmpDto.date_release));
        this.form.get('dateRelease')?.setValue(this.dto.date_release);
      }
      if(tmpDto.date_revision != undefined){
        this.dto.date_revision = this.getDate(new Date(tmpDto.date_revision));
        this.form.get('dateRevision')?.setValue(this.dto.date_revision);
      }
    }

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.form.get('id')?.setValue(this.id);
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}],
      description: [{value: '', disabled: true}],
      logo: [{value: '', disabled: true}],
      dateRelease: [{value: '', disabled: true}],
      dateRevision: [{value: '', disabled: true}]
    });
  }


  cancel(){
    this.router.navigate(['/financial-product-information']);
  }

  deleteProduct(){
    this.sendSave = true;

    this.financialProductService.delete(this.id).subscribe(
      {
        next: ()=>{
          this.isSave = true;
          this.message = 'producto eliminado con exito';
          this.disabledBtnDelete = true;

          this.responseServiceService.responseApi.next(new ResponseApi({state: true, message: this.message}));
          this.router.navigate(['/financial-product-information']);
        },
        error: (e)=>{
          this.isSave = false;
          let message = '';
          if(e.error?.error?.message){
            message = e.error?.error?.message;
          }else{
            message = e.error;
          }
          console.log('e', e);
          this.message = `Ocurrio un error ${message}`;
        }
      }
    );

  }

  getDate(date: Date): string{
    const newYear = date.getFullYear();
    const newMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const newDay = ('0' + date.getDate()).slice(-2);
    return `${newDay}/${newMonth}/${newYear}`;
  }
}
