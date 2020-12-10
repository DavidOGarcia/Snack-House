import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'snack-house';
  handleSearch(value: string){
    console.log(value)
    this.filterProduct = value
  }

  filterProduct = '';
}
