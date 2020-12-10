import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {

  user: User = null;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.getCurrentUser()
    if(this.user.email.includes('@admin.com')){
      return true;
    }
    return this.router.navigate(['/chucherias']);
  }

  getCurrentUser(): void{
    this.authService.getCurrentUser().subscribe(response => {
      if(response){
        this.isAuthenticated = true;
        this.user = response;
        console.log('User ->', response);
        return;
      }

      this.isAuthenticated = false;
      this.user = null;
    });
  }
  
}
