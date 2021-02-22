import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../service/books/books.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book-model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books:Book[];
  is_admin:boolean;

  constructor(
    private booksService:BooksService,
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.token;
    this.reloadData(this.token);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);
    this.is_admin = decodedToken.is_admin;
  }

  public setTitle() {
    this.titleService.setTitle('Home');
  }

  get token(){
    let token = localStorage.getItem("auth-token");
    return token;
  }

  reloadData(token) {
    this.booksService.allBooks(token).subscribe(
      (res) => this.books = res
    );
  }

  isAdmin(){
    return this.authService.isLoggedAdmin();
  }

  deleteBook(book:Book){
    const index = this.books.indexOf(book);
    this.books.splice(index,1);
    
    this.booksService.deleteBook(book._id,this.token).subscribe(
      data => {
        console.log(data);
        this.toastr.success(book.title+' deleted!');

      }
      , 
      error =>{
        console.log(error);
        this.toastr.error("Error");
      }
    );
  }

}
