import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IngredientsService } from '../ingredients.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  uname: any;
  uemail: any;
  upnum: any;
  upassword: any;
  user: any;
  userdata: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private obj: IngredientsService
  ) {
    this.uname = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$');
    this.uemail = new RegExp(
      '^[A-Za-z]+([.-]?[A-Za-z]+)*@[A-Za-z]+([.-]?[A-Za-z]+)*(.[A-Za-z]{2,3})+$'
    );
    this.upnum = new RegExp('^[0-9]{10}$');
    this.upassword = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}'
    );
    this.userdata = [];
  }
  sendValues(LoginForm: any) {
    if (LoginForm.Invalid) {
      alert('Check the details');
    } else {
      this.user = {
        uname: LoginForm.uname,
        uemail: LoginForm.uemail,
        upassword: LoginForm.upassword,
        upnum: LoginForm.upnum,
        ufname: LoginForm.ufname,
      };
      this.obj.getuserdata(this.user).subscribe((data: any) => {
        this.userdata = data;
      });
      if (this.userdata.message != 'User Already Exist!!!') {
        alert('Inserting Data!!!');
        this.http
          .post('http://localhost:3100/signup', this.user)
          .subscribe((data: any) => {
            this.userdata = data;
            alert(data);
          });
        alert('Sign Up succefull..... Login');
        this.obj.setusername(LoginForm.uname);
        this.router.navigate(['login']);
      } else {
        alert('User Already Exist with given User Name!!!\nTry to Login');
        this.router.navigate(['login']);
      }
    }
  }
}
