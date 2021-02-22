import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id;
  name;
  email;
  constructor(private router:Router,private authService:AuthService) { 
  }

  ngOnInit(): void {
    let token = localStorage.getItem("auth-token");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.id=decodedToken._id;
    this.name=decodedToken.name
    this.email=decodedToken.email;
  }

  isLogged(){
    return this.authService.isLoggedIn();
  }

  isAdmin(){
    return this.authService.isLoggedAdmin();
  }

  logout(){
    localStorage.removeItem("auth-token");
    this.router.navigate(['/login']);
  }

}
