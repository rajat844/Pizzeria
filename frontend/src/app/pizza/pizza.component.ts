import { Component } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css'],
})
export class PizzaComponent {
  content: any = [];
  constructor(private obj: IngredientsService, private router: Router) {
    this.obj.getallPizza().subscribe((data: any) => (this.content = data));
  }

  setPizza(
    pizzaId: string,
    price: number,
    type: string,
    name: string,
    image: string
  ) {
    this.router.navigate(['/ingredients'], {
      queryParams: {
        pizzaId: pizzaId,
        price: price,
        type: type,
        name: name,
        image: image,
      },
    });
  }
}
