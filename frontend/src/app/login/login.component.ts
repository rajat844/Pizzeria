import { Component } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
//import { Router } from '@angular/router';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  uname: any;
  upassword: any;
  user: any;
  userdata: any;
  constructor(
    private router: Router,
    private obj: IngredientsService
  ) {}

  sendValues(LoginForm: any) {
    if (LoginForm.Invalid) {
      alert('Details are invalid');
    } else {
      this.user = {
        uname: LoginForm.uname,
        upassword: LoginForm.upassword,
      };
      this.obj.getlogindata(this.user).subscribe((data: any) => {
        this.userdata = data;
      });
      if (this.userdata.message == 'User Already Exist!!!') {
        alert('Login Successfull!!!');
        this.obj.setusername(LoginForm.uname);
        this.router.navigate(['home']);
      } else {
        alert('Invalid Username or Password!!!\nTry to Login');
        this.router.navigate(['login']);
      }
    }
  }
}
