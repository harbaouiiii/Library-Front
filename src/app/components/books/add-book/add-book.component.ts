import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../service/books/books.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book-model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book:Book=new Book();
  is_admin:boolean;
  submitted=false;

  constructor(
    private booksService:BooksService,
    private router:Router,
    private toastr:ToastrService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
  }

  public setTitle() {
    this.titleService.setTitle('Add a Book');
  }

  ajouter(){
    let token = localStorage.getItem("auth-token");
    this.booksService.addBook(this.book,token).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Book added!");
      }
      , 
      error => {
        console.log(error);
        this.toastr.error("Error");
      }
      );
      setTimeout(()=>{
        this.router.navigate(['/books']);
      },200)
  }

  onSubmit(){
    this.submitted=true;
    this.ajouter();
  }

}
