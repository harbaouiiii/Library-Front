import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/users/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users=[];

  constructor(
    private userService:UserService,
    private router:Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public setTitle() {
    this.titleService.setTitle('Users Management');
  }

  loadUsers(){
    let token = localStorage.getItem("auth-token");
    this.userService.getAll(token).subscribe(
      res=>this.users=res,
      error=>console.log(error)
    );
  }

  delete(id,user){
    let index = this.users.indexOf(user);
    this.users.splice(index,1);
    
    let token = localStorage.getItem("auth-token");
    this.userService.delete(id,token).subscribe(
      res=>{
        console.log(res);
      },
      error=>console.log(error)
    );
  }

  change(id){
    let token = localStorage.getItem("auth-token");
    this.userService.changePermission(id,token).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/users']);
      }
    );
  }

}
