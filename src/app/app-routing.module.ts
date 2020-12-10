import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ChuchesPageComponent } from './pages/chuches-page/chuches-page.component';
import { CRUDPageComponent } from './pages/crud-page/crud-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path:'login', component: LoginPageComponent},
  {path: 'cart', canActivate:[AuthGuard], component: CartPageComponent},
  {path: 'register', component: SignUpPageComponent},
  {path: 'crud', canActivate:[AuthGuard],component:CRUDPageComponent},
  {path: 'chucherias',component: ChuchesPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
