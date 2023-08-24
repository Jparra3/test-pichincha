import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { FinancialProductService } from '../../services/financial-product.service';
import { ResponseServiceService } from '../../services/response-service.service';
import { ResponseApi } from '../../models/response-api';


@Component({
  selector: 'app-product-information-search',
  templateUrl: './product-information-search.component.html',
  styleUrls: ['./product-information-search.component.scss']
})
export class ProductInformationSearchComponent implements OnInit {

  searchForm: FormGroup;

  options = [5, 10, 15, 20, 25, 50, 100];
  selectedOption: number = 5;

  products: Product[] = [];
  originalProducts: Product[] = [];

  productsPerPage = 5;
  currentPage = 1;

  responseApi:ResponseApi = new ResponseApi({});

  constructor(private fb: FormBuilder,
    private financialProductService: FinancialProductService,
    private responseServiceService: ResponseServiceService,
    private router: Router
    ){
    this.searchForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [null]
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.responseServiceService.getResponseApi().subscribe((response: ResponseApi)=>{
      this.responseApi = response;
      setTimeout(()=>{
        this.responseApi.state = false;
      }, 3000)
    });
  }

  getProducts(){
    this.financialProductService.search().subscribe((response: Product[])=>{
      this.products = response;
      this.originalProducts = response;
      this.productsPerPage = this.selectedOption;
    });
  }

  onNameInputChange() {
    const searchName = this.searchForm.get('name')!.value.trim().toLowerCase();
    if (searchName === '') {
      this.products = this.originalProducts; // Reset to original data if the search name is empty
    } else {
      this.products = this.originalProducts.filter(product =>
        product.name!.toLowerCase().includes(searchName)
      );
    }
  }

  onOptionChange(event: any) {
    this.selectedOption = parseInt(event.target.value, 10);
    this.currentPage = 1; // Reset to first page when changing options
    this.productsPerPage = this.selectedOption; // Update the products per page
  }



  get productsToDisplay(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.selectedOption);
  }

  newProduct(e?: SubmitEvent): void{
    e?.preventDefault();
    this.router.navigate(['/financial-product-information/create']);
  }

  toggleMenu(product: any) {
    this.products = this.products.map(data => ({
      ...data,
      showMenu: data.id === product.id ? !data.showMenu : false
    }));
    product.showMenu = !product.showMenu;
  }

  editProduct(product: any) {
    this.financialProductService.setData(product);

    this.router.navigate(['/financial-product-information/update/'+product.id]);
  }

  deleteProduct(product: any) {
    this.financialProductService.setData(product);

    this.router.navigate(['/financial-product-information/delete/'+product.id]);
  }

}
