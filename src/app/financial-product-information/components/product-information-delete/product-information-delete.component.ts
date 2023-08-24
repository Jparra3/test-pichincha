import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { FinancialProductService } from '../../services/financial-product.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router
  ){

    this.dto = new Product({});
    this.form = this.createForm();

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.form.get('id')?.setValue(this.id);
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [{value: '', disabled: true}],
      // name: [{value: '', disabled: true}],
      // description: [{value: '', disabled: true}],
      // logo: [{value: '', disabled: true}],
      // dateRelease: [{value: '', disabled: true}],
      // dateRevision: [{value: '', disabled: true}]
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
        },
        error: (e)=>{
          this.isSave = false;
          this.message = 'Ocurrio un error';
          console.log('e', e);
        }
      }
    );

  }
}
