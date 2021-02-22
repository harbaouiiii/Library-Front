import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080/auth/";

  constructor(private http:HttpClient) { }

  getAll(token){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"users",httpOptions);
  }

  get(id,token){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"user/"+id,httpOptions);
  }

  edit(user:User,token){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.patch<any>(this.url+"edit/",user,httpOptions);
  }

  delete(id,token){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+"delete/"+id,httpOptions);
  }

  changePermission(id,token){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.patch<any>(this.url+"permission/"+id,httpOptions);
  }

}
