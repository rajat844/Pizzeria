import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CurrencyPipe } from './currency.pipe';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { PizzaComponent } from './pizza/pizza.component';
import { CartComponent } from './cart/cart.component';
import { UrlNotFoundComponent } from './url-not-found/url-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsernamePipe } from './username.pipe';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrencyPipe,
    IngredientsComponent,
    PizzaComponent,
    CartComponent,
    UrlNotFoundComponent,
    LoginComponent,
    SignupComponent,
    UsernamePipe,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
