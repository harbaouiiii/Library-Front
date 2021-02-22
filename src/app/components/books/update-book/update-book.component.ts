import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {BooksService} from '../../../service/books/books.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  book:Book;
  id:any;
  submitted:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private booksService:BooksService,
    private toastr:ToastrService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  public setTitle() {
    this.titleService.setTitle('Update a Book');
  }

  reloadData(){
    let token = localStorage.getItem("auth-token");
    this.id=this.route.snapshot.params['id'];
    this.booksService.getBook(this.id,token).subscribe(
      data=>this.book=data,
      error=>console.log(error)
    );
  }

  onSubmit(){
    let token = localStorage.getItem("auth-token");
    this.submitted=true;
    this.booksService.updateBook(this.id,this.book,token).subscribe(
      data=>{
        console.log(data);
        this.toastr.success('Book updated!');
        this.router.navigate(['/books']);
      }
      ,
      error=>{
        console.log(error);
        this.toastr.error('Error');
      }
    );
  }

}
