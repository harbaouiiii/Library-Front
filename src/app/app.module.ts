import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule,ToastNoAnimation,ToastNoAnimationModule} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { BooksService } from '../app/service/books/books.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { UpdateBookComponent } from './components/books/update-book/update-book.component';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AddBookComponent,
    UpdateBookComponent,
    UsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    BooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
