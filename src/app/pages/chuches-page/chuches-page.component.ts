import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chuches-page',
  templateUrl: './chuches-page.component.html',
  styleUrls: ['./chuches-page.component.scss']
})
export class ChuchesPageComponent implements OnInit {


  handleSearch(value: string){
    this.filterProduct = value
  }

  filterProduct = '';

  closeResult = '';
  collection = {count:60, data:[]}
  config: any;
  cantidad:number = 1;
  productForm: FormGroup;
  productId: string;
  editar: boolean;
  monto: number = 0;

  constructor(private crudService: CRUDService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.productId= '',
    this.config ={
      itemsPerPage: 5,
      currentPage:1,
      totalItems: this.collection.data.length
    } 

    this.crudService.getProducts().subscribe(response=>{
      this.collection.data = response.map((product:any)=>{
        return {
          nombre:product.payload.doc.data().nombre,
          precio:product.payload.doc.data().precio,
          peso:product.payload.doc.data().peso,
          categoria:product.payload.doc.data().categoria,
          cantidad:product.payload.doc.data().cantidad,
          imagen:product.payload.doc.data().imagen,
          descripcion:product.payload.doc.data().descripcion,
          id: product.payload.doc.id,
        }
      })
    }) 

  }


  agregarCantidad(product:any){

    if(this.cantidad != product.cantidad){
      this.cantidad = this.cantidad + 1
      this.monto = this.monto + product.precio
    }
      
      
  }
  
  restarCantidad(product:any){
    if(this.cantidad != 0){
      this.cantidad = this.cantidad - 1
      this.monto = this.monto - product.precio
    }
}



open(content, product: any) {
  this.monto = product.precio
  this.cantidad = 0


  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.editar = false;
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {  
    this.productForm.reset() 
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    this.productForm.reset() 
    return 'by clicking on a backdrop';
  } else {
    this.productForm.reset() 
    return `with: ${reason}`;
  }
}

}
