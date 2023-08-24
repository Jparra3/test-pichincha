import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrerateProduct } from '../../models/create-product';
import { FinancialProductService } from '../../services/financial-product.service';

@Component({
  selector: 'app-product-information-create',
  templateUrl: './product-information-create.component.html',
  styleUrls: ['./product-information-create.component.scss']
})
export class ProductInformationCreateComponent {

  form: FormGroup;
  dto: CrerateProduct;
  currentDate: Date;
  sendSave: boolean = false;
  isSave!: boolean | undefined;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private financialProductService: FinancialProductService
  ){

    this.dto = new CrerateProduct({});

    this.form = this.createForm();

    this.currentDate = new Date();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      dateRelease: ['', [Validators.required]],
      dateRevision: [{value: '', disabled: true}, [Validators.required]]
    });
  }


  clearForm(){
    this.dto = new CrerateProduct({});
    this.form = this.createForm();

    this.sendSave = false;
    this.isSave = undefined;
  }

  save(){
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
        next:(response: CrerateProduct)=>{
          this.isSave = true;
          this.message = 'producto guardado con exito';
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
      this.financialProductService.verificationId(this.form.controls['id'].value).subscribe((response: Boolean)=>{
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

}
