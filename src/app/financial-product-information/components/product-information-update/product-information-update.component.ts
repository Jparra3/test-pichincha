import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateProduct } from '../../models/update-product';
import { FinancialProductService } from '../../services/financial-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-information-update',
  templateUrl: './product-information-update.component.html',
  styleUrls: ['./product-information-update.component.scss']
})
export class ProductInformationUpdateComponent implements OnInit {

  form: FormGroup;
  dto: UpdateProduct;
  currentDate: Date;
  sendSave: boolean = false;
  isSave!: boolean | undefined;
  message: string = '';
  id!: string;

  constructor(
    private fb: FormBuilder,
    private financialProductService: FinancialProductService,
    private route: ActivatedRoute
  ){

    this.dto = new UpdateProduct({});

    this.form = this.createForm();

    this.currentDate = new Date();
  }

  ngOnInit() {

    const tmpDto = this.financialProductService.getData();
    if(tmpDto != undefined){
      this.dto = new UpdateProduct(tmpDto);
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
      this.dto.id = this.id;
      this.form.get('id')?.setValue(this.id);
    });

  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [{value: this.dto.id, disabled: true}],
      name: [this.dto.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [this.dto.description, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      logo: [this.dto.logo, [Validators.required]],
      dateRelease: [this.dto.date_release, [Validators.required]],
      dateRevision: [{value: this.dto.date_revision, disabled: true}, [Validators.required]]
    });
  }

  clearForm(){
    this.dto = new UpdateProduct({});
    this.form = this.createForm();

    this.dto.id = this.id;
    this.form.get('id')?.setValue(this.dto.id);

    this.sendSave = false;
    this.isSave = undefined;
  }

  update(){
    this.sendSave = true;
    const formValue = this.form.getRawValue();
    this.dto.id =  formValue.id;
    this.dto.name =  formValue.name;
    this.dto.description = formValue.description;
    this.dto.logo =  formValue.logo;

    const argRevision = (this.form.get('dateRevision')?.value).split('/');
    this.dto.date_revision = `${argRevision[2]}-${argRevision[1]}-${argRevision[0]}`;

    const argRelease = (this.form.get('dateRelease')?.value).split('/');
    this.dto.date_release = `${argRelease[2]}-${argRelease[1]}-${argRelease[0]}`;

    this.financialProductService.create(this.dto).subscribe(
      {
        next:(response: UpdateProduct)=>{
          this.isSave = true;
          this.message = 'producto actualizado con exito';
        },
        error: (e)=>{
          this.isSave = false;
          this.message = 'Ocurrio un error';
          console.log('e', e);
        }
      }
    );

  }

  validateId(){
    if(this.form.controls['id'].valid){
      this.financialProductService.verificationId(this.dto.id).subscribe((response: Boolean)=>{
        if(response){
          this.form.controls['id']!.disable();
        }else{
          this.form.controls['id'].setErrors({ invalid: true });
          this.form.controls['id'].markAsTouched();
        }
      })
    }
  }

  validateDateRelease(){
    this.form.get('dateRevision')?.setValue('');
    const dateReleaseControl = this.form.get('dateRelease');

    if (dateReleaseControl && dateReleaseControl.value) {
      const dateParts = dateReleaseControl.value.split('/');
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const enteredDate = new Date(year, month, day);
        const currentDate = new Date();

        const enteredDateWithoutTime = new Date(enteredDate.getFullYear(), enteredDate.getMonth(), enteredDate.getDate());
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        if (isNaN(enteredDate.getTime()) || enteredDateWithoutTime < currentDateWithoutTime) {
          dateReleaseControl.setErrors({ invalidDate: true });
        } else {
          dateReleaseControl.setErrors(null);
          enteredDate.setFullYear(enteredDate.getFullYear() + 1);
          const newYear = enteredDate.getFullYear();
          const newMonth = ('0' + (enteredDate.getMonth() + 1)).slice(-2);
          const newDay = ('0' + enteredDate.getDate()).slice(-2);
          const newFormattedDate = `${newDay}/${newMonth}/${newYear}`;
          this.form.get('dateRevision')?.setValue(newFormattedDate);
        }
      } else {
        dateReleaseControl.setErrors({ invalidDate: true });
      }
    }
  }

  getDate(date: Date): string{
    const newYear = date.getFullYear();
    const newMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const newDay = ('0' + date.getDate()).slice(-2);
    return `${newDay}/${newMonth}/${newYear}`;
  }
}
