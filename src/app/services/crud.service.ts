import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private firestore: AngularFirestore) { }


  getProducts(){
    return this.firestore.collection('products').snapshotChanges();
  }

  addProduct(product:any){
    return this.firestore.collection('products').add(product);
  }

  updateProduct(id:any, product:any){
    return this.firestore.collection('products').doc(id).update(product);
  }

  deleteProduct(id:any){
    this.firestore.collection('products').doc(id).delete();
  }

}
