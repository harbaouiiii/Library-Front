import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  error;

  constructor(private formBuilder:FormBuilder, private authService:AuthService,private router:Router, private toastr:ToastrService,private titleService: Title) {
    let registerFormControls = {
      name:new FormControl('',[
        Validators.minLength(3),
        Validators.required,
      ]),
      email:new FormControl('',[
        Validators.email,
        Validators.required,
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-z0-9]+'),
      ])
    };
    this.registerForm=formBuilder.group(registerFormControls);
  }

  public setTitle() {
    this.titleService.setTitle('Register');
  }

  ngOnInit(): void {
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  register(){
    let data = this.registerForm.value;
    
    this.authService.register(data).subscribe(
      res=>{
        console.log(res);
       this.toastr.success('User registred succesfully'),
        this.router.navigate(['/login']);
      },
      error=>{
        this.error=error.error;
        this.toastr.error(error.error);
      }
    );
  }

}
