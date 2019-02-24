import { Component, OnInit } from '@angular/core';
import { Userdetails } from 'src/app/models/userdetails';
import { GithubService } from 'src/app/services/github.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedUser: Userdetails;
  constructor(private github: GithubService,private route:ActivatedRoute) { }

  ngOnInit() {
    const id= +this.route.snapshot.paramMap.get('id');
    this.getUsersById(id);
    console.log(this.selectedUser);
  }

  getUsersById(id: number): Userdetails {
      this.selectedUser = this.github.users.getValue().find(user => user.id === id);
      return this.selectedUser;
  }
}
