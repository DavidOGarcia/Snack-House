import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;
  user: User = null;
  closeResult = '';

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCurrentUser();
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
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
