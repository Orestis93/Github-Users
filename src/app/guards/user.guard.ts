import { CanActivate } from '@angular/router';
import { GithubService } from '../services/github.service';
import { Injectable } from '@angular/core';
@Injectable()
export class UsersGuard implements CanActivate {
    constructor(private github: GithubService) { }
    canActivate() {
        return this.github.getUsers();
    }

}