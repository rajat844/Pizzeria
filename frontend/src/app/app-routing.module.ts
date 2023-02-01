import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import {IngredientsComponent} from './ingredients/ingredients.component';
import {PizzaComponent} from './pizza/pizza.component';
import {CartComponent } from './cart/cart.component';
import {UrlNotFoundComponent} from './url-not-found/url-not-found.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"home",component:HomeComponent },
  {path:"ingredients",component:IngredientsComponent},
  {path:"pizza",component:PizzaComponent},
  {path:"cart",component:CartComponent },
  {path:"",component:HomeComponent },
  {path:"login",component:LoginComponent  },
  {path:"signup",component:SignupComponent },
  {path:"**",component:UrlNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
