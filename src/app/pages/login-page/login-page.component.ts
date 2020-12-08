import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;
  user: User = null;
  closeResult = '';
  loginForm: FormGroup = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
    
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then((response) =>{
      this.router.navigate(['/']);
    });
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
  
  onSubmit(): void {
    console.log({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    });
    this.authService.loginWithEmail(this.loginForm.get('email').value, 
    this.loginForm.get('password').value).then(()=>{
      this.router.navigate(['/']);
    });
  }

}
