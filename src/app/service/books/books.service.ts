import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public url="http://localhost:8080/books/";

  constructor(private http:HttpClient) { }

  allBooks(token:any){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url,httpOptions);
  }

  getBook(id:any,token:any){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+id,httpOptions);
  }

  addBook(book:Book,token:any){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url,book,httpOptions);
  }

  updateBook(id:any,book:Book,token:any){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.patch<any>(this.url+id,book,httpOptions);
  }

  deleteBook(id:any,token:any){
    var headers_object = new HttpHeaders().set("auth-token",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+id,httpOptions);
  }

}
