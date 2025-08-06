import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, UserFormComponent],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserManagementPage implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isLoading = false;
  showForm = false;
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  onAddUser(): void {
    this.selectedUser = null;
    this.isEditing = false;
    this.showForm = true;
  }

  onEditUser(user: User): void {
    this.selectedUser = user;
    this.isEditing = true;
    this.showForm = true;
  }

  onSaveUser(userData: Partial<User>): void {
    if (this.isEditing && userData.id) {
      this.userService.updateUser(userData as User).subscribe({
        next: (updatedUser) => {
          this.users = this.users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          );
          this.showForm = false;
          this.selectedUser = null;
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      const { name, email } = userData;
      if (name && email) {
        this.userService.createUser({ name, email }).subscribe({
          next: (newUser) => {
            this.users.push(newUser);
            this.showForm = false;
          },
          error: (error) => {
            console.error('Error creating user:', error);
          }
        });
      }
    }
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  onCancelForm(): void {
    this.showForm = false;
    this.selectedUser = null;
    this.isEditing = false;
  }
}
