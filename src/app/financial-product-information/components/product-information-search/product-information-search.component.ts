import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { FinancialProductService } from '../../services/financial-product.service';

@Component({
  selector: 'app-product-information-search',
  templateUrl: './product-information-search.component.html',
  styleUrls: ['./product-information-search.component.scss']
})
export class ProductInformationSearchComponent implements OnInit {

  searchForm: FormGroup;

  options = [5, 10, 15, 20, 25, 50, 100];
  selectedOption: number = 5;

  /* products: Product[] = [new Product({
    id: 'trj-crd',
    name: 'Tarjetas de Crédito',
    description: 'Tarjeta de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2023-08-24T15:30:00',
    date_revision: '2024-08-24T15:30:00'
  })]; */
  products: Product[] = [];
  productsPerPage = 5;
  currentPage = 1;

  constructor(private fb: FormBuilder,
    private financialProductService: FinancialProductService,
    private router: Router
    ){
    this.searchForm = this.createForm();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.financialProductService.search().subscribe((response: Product[])=>{
      this.products = response;
    });
  }

  onOptionChange(event: any) {
    this.selectedOption = parseInt(event.target.value, 10);
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [null]
    });
  }

  get productsToDisplay(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return this.products.slice(startIndex, startIndex + this.productsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.productsPerPage);
  }

  newProduct(e?: SubmitEvent): void{
    e?.preventDefault();
    this.router.navigate(['/financial-product-information/create']);
  }

  toggleMenu(product: any) {

    /* this.products.forEach(data => {
      if(data.id != product.id){
        data.showMenu = false;
      }
    }); */
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
    this.router.navigate(['/financial-product-information/delete/'+product.id]);
  }

}
