import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  user: User = null;
  search = new FormControl('');

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.search.valueChanges.pipe(
      
      debounceTime(300)

    ).subscribe(value => this.searchEmitter.emit(value))
  }

  getCurrentUser(): void{
    this.authService.getCurrentUser().subscribe(response => {
      if(response){
        this.isAuthenticated = true;
        this.user = response;
        return;
      }

      this.isAuthenticated = false;
      this.user = null;
    });
  }

  logout(): void{
    this.authService.logout().then(()=>{
      this.router.navigate(['/']);
    })
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then((response) =>{
      this.router.navigate(['/']);
    });
  }
 
  @Output('search') searchEmitter = new EventEmitter<string>();

}
