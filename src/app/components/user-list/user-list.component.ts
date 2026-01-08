import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { User, UserStatus } from '../../models/user.model';

type Severity = 'success' | 'danger' | 'warn' | 'info';

const STATUS_SEVERITY_MAP: Readonly<Record<UserStatus, Severity>> = {
  active: 'success',
  inactive: 'danger',
  pending: 'warn',
} as const;

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  private readonly users$ = this.userService.getAllUsers();
  readonly users = toSignal(this.users$, {
    initialValue: [] as User[],
  });

  readonly isEmpty = computed(() => this.users().length === 0);

  getStatusSeverity(status: UserStatus): Severity {
    return STATUS_SEVERITY_MAP[status] ?? 'info';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
