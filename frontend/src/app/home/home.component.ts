import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Ingredients:any;
  cheff:any;
  clock:any;
  constructor() {
    //image location
    this.Ingredients = '/assets/images/Ingredients.png';
    this.cheff='/assets/images/cheff.png';
    this.clock='/assets/images/clock.png';
  }

}
