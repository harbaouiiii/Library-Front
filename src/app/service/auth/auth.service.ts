import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/auth/";

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post<any>(this.url+"login",data);
  }

  register(data){
    return this.http.post(this.url+"register",data,{responseType: 'text'});
  } 

  isLoggedIn(){
    let token = localStorage.getItem("auth-token");
    if (token) {
      return true;
    }
    return false;
  }

  isLoggedAdmin(){
    let token = localStorage.getItem("auth-token");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    
    let is_admin = decodedToken.is_admin;
    if(is_admin){
      return true;
    }
    return false;
  }

}
