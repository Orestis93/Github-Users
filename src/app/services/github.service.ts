import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Userdetails } from '../models/userdetails';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  mainurl: string = "https://api.github.com/users"
  private client_id = 'd9a67167aa45fb0b8f65'
  private client_secret = 'd90c2a1e2c74e9024504d5ec1849b9d09e498fbf';
  users: BehaviorSubject<Userdetails[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  getUsers(): Observable<boolean> {
    return this.http.get(this.mainurl + "?client_id=" + this.client_id + "&client_secret=" + this.client_secret).pipe(
      tap(
        (users: Userdetails[]) => {
          this.users.next(users);
        }
      ),
      mapTo(true)
    )
  }
  searchUsers(value: string): BehaviorSubject<Userdetails> {
    return this.http.get(this.mainurl + '/' + value + "?client_id=" + this.client_id + "&client_secret=" + this.client_secret) as BehaviorSubject<Userdetails>
  }

}