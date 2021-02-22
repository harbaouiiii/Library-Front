import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksComponent} from '../app/components/books/books.component';
import {LoginComponent} from '../app/components/login/login.component';
import {RegisterComponent} from '../app/components/register/register.component';
import {AddBookComponent} from '../app/components/books/add-book/add-book.component';
import {UpdateBookComponent} from '../app/components/books/update-book/update-book.component'
import {AuthGuard} from '../app/guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

const routes: Routes = [
  {path:'',redirectTo:'books',pathMatch:'full'},
  {path:'books', component:BooksComponent ,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'add-book', component:AddBookComponent,canActivate:[AuthGuard,RoleGuard]},
  {path:'update-book/:id',component:UpdateBookComponent,canActivate:[AuthGuard,RoleGuard]},
  {path:'users', component:UsersComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'edit/:id',component:EditUserComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
