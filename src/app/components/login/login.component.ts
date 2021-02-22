import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  error;

  constructor(private formBuilder:FormBuilder, private authService:AuthService,private router:Router,private titleService: Title) {
    let loginFormControls = {
      email:new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
      ]),
    }
    this.loginForm=formBuilder.group(loginFormControls);
  }

  ngOnInit(): void {
  }

  public setTitle() {
    this.titleService.setTitle('Login');
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(
      res=>{
        localStorage.setItem("auth-token",res.token);
        this.router.navigate(['/books']);
      },
      error=>{
        this.error=error.error;
      }
    );
  }

}
