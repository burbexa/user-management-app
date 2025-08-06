import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number>();

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteUser.emit(id);
    }
  }
} 