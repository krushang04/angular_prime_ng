import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { User, UserApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Administrator',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      department: 'IT'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'active',
      createdAt: '2024-01-20T14:20:00Z',
      department: 'Sales'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Developer',
      status: 'active',
      createdAt: '2024-02-01T09:15:00Z',
      department: 'Engineering'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Designer',
      status: 'active',
      createdAt: '2024-02-05T11:45:00Z',
      department: 'Design'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'Analyst',
      status: 'inactive',
      createdAt: '2024-02-10T16:30:00Z',
      department: 'Finance'
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Manager',
      status: 'active',
      createdAt: '2024-02-12T08:20:00Z',
      department: 'Marketing'
    },
    {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      role: 'Developer',
      status: 'active',
      createdAt: '2024-02-15T13:10:00Z',
      department: 'Engineering'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      role: 'HR Specialist',
      status: 'pending',
      createdAt: '2024-02-18T10:00:00Z',
      department: 'Human Resources'
    },
    {
      id: 9,
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      role: 'Developer',
      status: 'active',
      createdAt: '2024-02-20T15:45:00Z',
      department: 'Engineering'
    },
    {
      id: 10,
      name: 'Amanda White',
      email: 'amanda.white@example.com',
      role: 'Product Manager',
      status: 'active',
      createdAt: '2024-02-22T12:30:00Z',
      department: 'Product'
    },
    {
      id: 11,
      name: 'Christopher Lee',
      email: 'christopher.lee@example.com',
      role: 'Developer',
      status: 'active',
      createdAt: '2024-02-25T09:00:00Z',
      department: 'Engineering'
    },
    {
      id: 12,
      name: 'Jessica Harris',
      email: 'jessica.harris@example.com',
      role: 'Marketing Specialist',
      status: 'active',
      createdAt: '2024-02-28T14:15:00Z',
      department: 'Marketing'
    },
    {
      id: 13,
      name: 'Daniel Clark',
      email: 'daniel.clark@example.com',
      role: 'Sales Representative',
      status: 'inactive',
      createdAt: '2024-03-01T11:20:00Z',
      department: 'Sales'
    },
    {
      id: 14,
      name: 'Michelle Lewis',
      email: 'michelle.lewis@example.com',
      role: 'Designer',
      status: 'active',
      createdAt: '2024-03-03T16:00:00Z',
      department: 'Design'
    },
    {
      id: 15,
      name: 'Matthew Walker',
      email: 'matthew.walker@example.com',
      role: 'Analyst',
      status: 'active',
      createdAt: '2024-03-05T10:30:00Z',
      department: 'Finance'
    },
    {
      id: 16,
      name: 'Ashley Hall',
      email: 'ashley.hall@example.com',
      role: 'Administrator',
      status: 'active',
      createdAt: '2024-03-08T13:45:00Z',
      department: 'IT'
    },
    {
      id: 17,
      name: 'Andrew Allen',
      email: 'andrew.allen@example.com',
      role: 'Developer',
      status: 'pending',
      createdAt: '2024-03-10T08:15:00Z',
      department: 'Engineering'
    },
    {
      id: 18,
      name: 'Stephanie Young',
      email: 'stephanie.young@example.com',
      role: 'Manager',
      status: 'active',
      createdAt: '2024-03-12T15:30:00Z',
      department: 'Sales'
    },
    {
      id: 19,
      name: 'Ryan King',
      email: 'ryan.king@example.com',
      role: 'Developer',
      status: 'active',
      createdAt: '2024-03-15T12:00:00Z',
      department: 'Engineering'
    },
    {
      id: 20,
      name: 'Nicole Wright',
      email: 'nicole.wright@example.com',
      role: 'HR Specialist',
      status: 'active',
      createdAt: '2024-03-18T09:45:00Z',
      department: 'Human Resources'
    }
  ];

  getUsers(page: number = 1, pageSize: number = 10): Observable<UserApiResponse> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = this.mockUsers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.mockUsers.length / pageSize);

    const response: UserApiResponse = {
      data: paginatedData,
      total: this.mockUsers.length,
      page,
      pageSize,
      totalPages
    };

    return of(response).pipe(delay(300));
  }

  getAllUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(200));
  }
}

