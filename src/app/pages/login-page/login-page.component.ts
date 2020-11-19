import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;
  user: User = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then((response) =>{});
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

}
