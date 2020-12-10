import { Pipe, PipeTransform } from '@angular/core';
import { iif } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[], producto: any): any[] {

    if (!producto) return lista

    return lista.filter(product => product.nombre.toUpperCase().includes(producto.toUpperCase()))
    
  }

}
