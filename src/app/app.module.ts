import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { CRUDPageComponent } from './pages/crud-page/crud-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginPageComponent,
    CartPageComponent,
    SignUpPageComponent,
    CRUDPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
