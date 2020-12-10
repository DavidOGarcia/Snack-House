import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      
      debounceTime(300)

    ).subscribe(value => this.searchEmitter.emit(value))
  }

  @Output('search') searchEmitter = new EventEmitter<string>();

}
