import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly allUsersSignal = signal<User[]>([]);
  private readonly loadingSignal = signal<boolean>(false);

  readonly users = signal<User[]>([]);
  readonly loading = this.loadingSignal;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loadingSignal.set(true);

    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.allUsersSignal.set(users);
        this.users.set(users);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loadingSignal.set(false);
      },
    });
  }

  getStatusSeverity(
    status: User['status']
  ): 'success' | 'danger' | 'warn' | 'info' {
    const severityMap: Record<
      User['status'],
      'success' | 'danger' | 'warn' | 'info'
    > = {
      active: 'success',
      inactive: 'danger',
      pending: 'warn',
    };
    return severityMap[status] || 'info';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
