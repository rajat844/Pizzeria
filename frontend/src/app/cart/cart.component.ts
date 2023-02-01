import { Component } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  user: boolean;
  username: string;
  content: any = [];
  cartdata: any;
  total: any = 0;
  userdata: any;

  constructor(private obj: IngredientsService, private router: Router) {
    this.user = this.obj.getusername();
    this.username = this.obj.getuser_data();
    if (this.user == true) {
      this.obj
        .getusercart({ username: this.username })
        .subscribe((data: any) => (this.content = data));

      console.log(this.content);
    }
  }

  delete(id: any) {
    this.obj.remove(this.content, id).subscribe((data: any) => {
      this.userdata = data;
    });
    if (this.userdata.message != 'Cart data not removed!!') {
      alert('Removed Successfull!!!');
      this.router.navigate(['cart']);
    } else {
      alert('Unable to Remove');
    }
  }

  checkout() {
    this.obj.checkout().subscribe((data: any) => {
      this.userdata = data;
    });
    if (this.userdata.message != 'Cart data not Checkouted!!') {
      alert('Checkout Successfull!!!');
      //this.obj.setusername(LoginForm.uname);
      this.router.navigate(['home']);
    } else {
      alert('Unable to Checkout');
      //this.router.navigate(['login']);
    }
  }
  totalamout(): number {
    // alert("totalAmountFunction Called")
    if (this.user == true && this.total == 0) {
      for (let data of this.content) {
        //console.log(data.id)
        this.total += data.price * data.qty;
      }
    }
    return this.total;
  }
  decrement(id: any) {
    //this.obj.getusercartdataforupdate({"username":this.username,"pizzaid":data}).subscribe((data:any)=>{this.cartdata= JSON.stringify(data);alert(data.qty+" \data")});

    this.obj.decrement(this.content, id).subscribe((data: any) => {
      this.userdata = data;
    });
    if (this.userdata.message != 'Cart data not updated!!') {
      alert('Upadted Successfull!!!');
      this.router.navigate(['pizza']);
      //this.obj.setusername(LoginForm.uname);
      
    } else {
      alert('Unable to Upadte');
    }
  }
  increment(id: any) {
    this.obj.increment(this.content, id).subscribe((data: any) => {
      this.userdata = data;
    });
    if (this.userdata.message != 'Cart data not updated!!') {
      alert('Upadted Successfull!!!');
      //this.obj.setusername(LoginForm.uname);
      this.router.navigate(['pizza']);
    } else {
      alert('Unable to Upadte');
      this.router.navigate(['login']);
    }
  }

  iscartempty() {
    return this.content.length == 0;
  }
}
