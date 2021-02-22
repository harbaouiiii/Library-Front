import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:User;
  id;
  submitted:boolean=false;

  constructor(
    private titleService: Title,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  public setTitle() {
    this.titleService.setTitle('Update User Informations');
  }

  reloadData(){
    let token = localStorage.getItem("auth-token");
    this.id=this.route.snapshot.params['id'];
    this.userService.get(this.id,token).subscribe(
      data=>this.user=data,
      error=>console.log(error)
    );
  }

  onSubmit(){
    let token = localStorage.getItem("auth-token");
    this.submitted=true;
    this.userService.edit(this.user,token).subscribe(
      data=>{
        console.log(data);
        localStorage.removeItem("auth-token");
        this.router.navigate(['/login']);
      }
      ,
      error=>{
        console.log(error);
      }
    );
  }

}
