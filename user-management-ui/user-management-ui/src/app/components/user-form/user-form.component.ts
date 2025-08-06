import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() isEditing = false;
  @Output() saveUser = new EventEmitter<Partial<User>>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    } else {
      this.userForm.reset();
    }
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const userData: Partial<User> = {
        name: this.userForm.value.name.trim(),
        email: this.userForm.value.email.trim().toLowerCase()
      };

      if (this.user?.id) {
        userData.id = this.user.id;
      }

      this.saveUser.emit(userData);
      this.userForm.reset();
      this.submitted = false;
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.userForm.reset();
    this.submitted = false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    
    if (field?.errors && this.submitted) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched || this.submitted));
  }
} 