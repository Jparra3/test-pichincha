import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-information-search',
  templateUrl: './product-information-search.component.html',
  styleUrls: ['./product-information-search.component.scss']
})
export class ProductInformationSearchComponent implements OnInit {


  searchForm: FormGroup;

  options = [5, 10, 15, 20, 25, 50, 100];
  selectedOption: number = 5;

  constructor(private fb: FormBuilder,
    private router: Router){
    this.searchForm = this.createForm();
  }

  ngOnInit(): void {

  }

  onOptionChange(event: any) {
    this.selectedOption = parseInt(event.target.value, 10);
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [null]
    });
  }

  products: Product[] = [
    new Product({
      id: '15',
      name: 'AAA',
      description: 'asdasdbva sdjsabdas da ',
      logo: 'asdadsad',
      data_release: 'asdasd',
      data_revision: 'asdadasd'
    }),
    new Product({
      id: '16',
      name: 'AAA',
      description: 'asdasdbva sdjsabdas da ',
      logo: 'asdadsad',
      data_release: 'asdasd',
      data_revision: 'asdadasd'
    })];
  productsPerPage = 5;
  currentPage = 1;

  get productsToDisplay(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return this.products.slice(startIndex, startIndex + this.productsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.productsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  search(): void{
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
    // Lógica para editar el producto
  }

  deleteProduct(product: any) {
    // Lógica para eliminar el producto
  }

}
