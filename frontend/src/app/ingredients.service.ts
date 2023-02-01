import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  url1: string;
  url2: string;
  url3: string;
  url4: string;
  url5: string;
  url6: string;
  url7: string;
  url8: string;
  url9: string;
  Username: string;
  cartdata: any;
  //Password:string;

  constructor(private http: HttpClient) {
    this.url1 = 'http://localhost:3100/getingredientsdata';
    this.url2 = 'http://localhost:3100/getpizzasdata';
    this.url3 = 'http://localhost:3100/getuserdata';
    this.url4 = 'http://localhost:3100/login';
    this.url5 = 'http://localhost:3100/getcartpizza';
    this.url6 = 'http://localhost:3100/getusercartdata';
    this.url7 = 'http://localhost:3100/updatecartdata';
    this.url8 = 'http://localhost:3100/removecartdata';
    this.url9 = 'http://localhost:3100/checkout';
    this.Username = '';
    //this.login=false;
  }
  getallIngredients() {
    return this.http.get(this.url1);
  }
  getallPizza() {
    return this.http.get(this.url2);
  }
  getuserdata(user: any) {
    return this.http.post(this.url3, user);
  }
  getlogindata(user: any) {
    return this.http.post(this.url4, user);
  }
  setusername(name: string) {
    console.log(name);
    this.Username = name;
  }
  getusername(): boolean {
    if (this.Username == '') return false;
    return true;
  }
  getuser_data(): string {
    return this.Username;
  }
  getcartpizza(pizza: any) {
    return this.http.post(this.url5, pizza);
  }
  getusercart(user: any) {
    return this.http.get(this.url6, user);
  }
  getusercartdataforupdate(user: any) {
    return this.http.post(this.url7, user);
  }
  decrement(data: any, id: any): any {
    console.log('User Id ' + id);
    for (let pp of data) {
      if (pp.pizzaid == id) {
        if (pp.qty == 1) {
          return this.remove(data, id);
        }
        console.log(pp.name);
        this.cartdata = {
          username: pp.username,
          pizzaid: pp.pizzaid,
          qty: pp.qty - 1,
        };
        return this.http.post(this.url7, this.cartdata);
      }
    }
    return 'Unable to Upadte!!';
  }
  increment(data: any, id: any): any {
    console.log('User Id ' + id);
    for (let pp of data) {
      if (pp.pizzaid == id) {
        console.log(pp.name);
        this.cartdata = {
          username: pp.username,
          pizzaid: pp.pizzaid,
          qty: pp.qty + 1,
        };
        return this.http.post(this.url7, this.cartdata);
      }
    }
    return 'Unable to Upadte!!';
  }
  remove(data: any, id: any): any {
    console.log('User Id ' + id);
    for (let pp of data) {
      if (pp.pizzaid == id) {
        console.log(pp.name);
        this.cartdata = {
          username: pp.username,
          pizzaid: pp.pizzaid,
        };
        return this.http.post(this.url8, this.cartdata);
      }
    }
    return 'Unable to Delete!!';
  }
  checkout(): any {
    return this.http.get(this.url9);
  }
}
