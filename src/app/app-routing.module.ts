import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersGuard } from './guards/user.guard';
//import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent, canActivate: [UsersGuard] },
  {
    path: 'profile/:id', component: ProfileComponent 

  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }