import { Routes } from '@angular/router';
import { UserManagementPage } from './pages/user/user';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserManagementPage }
];
