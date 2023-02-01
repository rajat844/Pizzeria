import { Component } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  content: any = [];
  total: any;
  pizzaId: any;
  pizzadata: any;
  pizzamessage: any;
  pizzaType: any;
  pizzaName: any;
  pizzaImage: any;
  selectedIngredients:any = [];
  constructor(
    private obj: IngredientsService,
    private router: Router,
    private objRouter: ActivatedRoute,
    private http: HttpClient
  ) {
    this.obj
      .getallIngredients()
      .subscribe((data: any) => (this.content = data));
  }
  ngOnInit(): void {
    this.objRouter.queryParamMap.subscribe((params) => {
      if (params.get('pizzaId') != null) {
        this.pizzaId = params.get('pizzaId');
        this.total = Number(params.get('price'));
        this.pizzaImage = params.get('type');
        this.pizzaName = params.get('name');
        this.pizzaImage = params.get('image');
      } else { 
        this.pizzaId = '0';
        this.total = 0;
        this.pizzaImage = '';
        this.pizzaName = '';
        this.pizzaImage = '';
      }
    });
  }
  totalSum(e: any, price: number, igName:string) {
    if (e.target.checked) {
      this.total += price;
      this.selectedIngredients.push(igName);

    } else {
      this.total -= price;
      for(let i = 0; i<this.selectedIngredients.length;i++){
        if(this.selectedIngredients[i] == igName){
          this.selectedIngredients.splice(i,1);
        }
      }
    }
  }

  sendmessage() {
    if (this.obj.getusername() == true) {
      alert('Submitted!!!!');
      this.router.navigate(['home']);
    } else {
      alert('Please Login to Add Cart!!!!!!!!');
      this.router.navigate(['login']);
    }
  }
  cart() {
    if(this.pizzaId == "0"){
      alert("Add the pizza first");
      return;
    }
    if (this.obj.getusername() == true) {
      this.pizzadata = {
        username: this.obj.getuser_data(),
        pizzaid: this.pizzaId,
      };
      this.obj.getcartpizza(this.pizzadata).subscribe((data: any) => {
        this.pizzamessage = data.message;
      });
      if (this.pizzamessage == 'No Pizza Found!!!') {
        alert('No pizza Found!!!\nTry to Insert');
        this.pizzadata = {
          username: this.obj.getuser_data(),
          pizzaid: this.pizzaId,
          qty: 1,
          price: parseInt(this.total),
          type: this.pizzaType,
          name: this.pizzaName,
          image: this.pizzaImage,
          igNames: this.selectedIngredients
        };
        this.http
          .post('http://localhost:3100/putcartdata', this.pizzadata)
          .subscribe((data: any) => {
            alert(data.message);
          });
        alert('Cart Data Inserted!!!');
        console.log(this.pizzadata);
      }
    } else {
      alert('Please Login to Add Cart!!!!!!!!');
      this.router.navigate(['login']);
    }
  }
}
