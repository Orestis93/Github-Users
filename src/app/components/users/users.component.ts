import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Userdetails } from 'src/app/models/userdetails';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['avatar', 'username', 'url'];
  name: string;
  searchField = new FormControl();
  users = new MatTableDataSource<Userdetails>();

  constructor(private github: GithubService, private router: Router) { }


  ngOnInit() {
    this.users.data = this.github.users.getValue();
    this.searchGitUsersInit()
  }
  ngAfterViewInit(): void {
    this.users.paginator = this.paginator;
  }
  getRecord(id: string) {
    this.router.navigate(['/profile', id]);
  }
  searchGitUsersInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value =>
        this.github.searchUsers(value).pipe(
          catchError(err => {
            this.users.data = []
            throw err;
          }
          )
        )
      )
    ).subscribe((user: Userdetails) => {
      this.users.data = [user]
      console.log(this.users)
    });
  }
}