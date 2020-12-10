import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from 'src/app/services/crud.service';
import { isNullOrUndefined } from 'util';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CRUDPageComponent implements OnInit {

  closeResult = '';
  config: any;
  collection = {count:60, data:[]}
  productForm: FormGroup;
  productId: string;
  editar: boolean;
  urllink: string = "Escritorio/FotosProyecto/cocosette.jpg";
  

  constructor(private fb: FormBuilder, private crudService: CRUDService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productId= '',
    this.config ={
      itemsPerPage: 5,
      currentPage:1,
      totalItems: this.collection.data.length
    } 

    this.productForm = this.fb.group({
      nombre:['', Validators.required],
      precio:['', Validators.required],
      peso:['', Validators.required],
      categoria:['', Validators.required],
      cantidad:['', Validators.required],
      imagen:['', Validators.required],
      descripcion:['', Validators.required],
    })

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

  pageChanged(event){
    this.config.currentPage = event;
  }

  eliminar(product: any): void{
    this.crudService.deleteProduct(product.id);
  }

  guardarDatos():void{
    this.crudService.addProduct(this.productForm.value).then(response=>{
      this.productForm.reset();
      this.modalService.dismissAll() 
    }).catch(error=>{
      console.error(error)
    })
    
  }
  
  updateProduct(){
    
      this.crudService.updateProduct( this.productId, this.productForm.value).then(response=>{
        this.productForm.reset();
        this.modalService.dismissAll() 
      }).catch(error=>{
        console.error(error)
      })  
  }

  selectFiles(event){
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any) =>{
        this.urllink = event.target.result
        
      }
    }
  }


  openEdit(content, product:any) {
    this.productForm.setValue({
      nombre: product.nombre,
      precio: product.precio,
      peso: product.peso,
      categoria: product.categoria,
      cantidad: product.cantidad,
      imagen: product.imagen,
      descripcion: product.descripcion,
    });

    this.productId = product.id
    console.log('Id del producto', this.productId)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editar = true
  }

  open(content) {
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

  


