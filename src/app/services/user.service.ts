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
    },
    {
      id: 21,
      name: 'Kevin Patel',
      email: 'kevin.patel@example.com',
      role: 'Senior Developer',
      status: 'active',
      createdAt: '2024-03-20T10:00:00Z',
      department: 'Engineering'
    },
    {
      id: 22,
      name: 'Rachel Green',
      email: 'rachel.green@example.com',
      role: 'UX Designer',
      status: 'active',
      createdAt: '2024-03-22T11:30:00Z',
      department: 'Design'
    },
    {
      id: 23,
      name: 'Thomas Moore',
      email: 'thomas.moore@example.com',
      role: 'Business Analyst',
      status: 'active',
      createdAt: '2024-03-25T09:15:00Z',
      department: 'Finance'
    },
    {
      id: 24,
      name: 'Olivia Bennett',
      email: 'olivia.bennett@example.com',
      role: 'Marketing Manager',
      status: 'active',
      createdAt: '2024-03-28T14:20:00Z',
      department: 'Marketing'
    },
    {
      id: 25,
      name: 'William Garcia',
      email: 'william.garcia@example.com',
      role: 'Sales Director',
      status: 'active',
      createdAt: '2024-04-01T08:45:00Z',
      department: 'Sales'
    },
    {
      id: 26,
      name: 'Sophia Rodriguez',
      email: 'sophia.rodriguez@example.com',
      role: 'Product Designer',
      status: 'active',
      createdAt: '2024-04-03T13:10:00Z',
      department: 'Design'
    },
    {
      id: 27,
      name: 'Benjamin Scott',
      email: 'benjamin.scott@example.com',
      role: 'DevOps Engineer',
      status: 'active',
      createdAt: '2024-04-05T10:30:00Z',
      department: 'Engineering'
    },
    {
      id: 28,
      name: 'Isabella Adams',
      email: 'isabella.adams@example.com',
      role: 'Content Writer',
      status: 'active',
      createdAt: '2024-04-08T11:00:00Z',
      department: 'Marketing'
    },
    {
      id: 29,
      name: 'Lucas Mitchell',
      email: 'lucas.mitchell@example.com',
      role: 'QA Engineer',
      status: 'active',
      createdAt: '2024-04-10T15:20:00Z',
      department: 'Engineering'
    },
    {
      id: 30,
      name: 'Mia Roberts',
      email: 'mia.roberts@example.com',
      role: 'Account Manager',
      status: 'active',
      createdAt: '2024-04-12T09:30:00Z',
      department: 'Sales'
    },
    {
      id: 31,
      name: 'Alexander Turner',
      email: 'alexander.turner@example.com',
      role: 'Frontend Developer',
      status: 'active',
      createdAt: '2024-04-15T12:45:00Z',
      department: 'Engineering'
    },
    {
      id: 32,
      name: 'Charlotte Phillips',
      email: 'charlotte.phillips@example.com',
      role: 'Data Analyst',
      status: 'active',
      createdAt: '2024-04-18T10:15:00Z',
      department: 'Finance'
    },
    {
      id: 33,
      name: 'Henry Campbell',
      email: 'henry.campbell@example.com',
      role: 'Backend Developer',
      status: 'active',
      createdAt: '2024-04-20T14:00:00Z',
      department: 'Engineering'
    },
    {
      id: 34,
      name: 'Amelia Parker',
      email: 'amelia.parker@example.com',
      role: 'Graphic Designer',
      status: 'active',
      createdAt: '2024-04-22T11:30:00Z',
      department: 'Design'
    },
    {
      id: 35,
      name: 'Daniel Evans',
      email: 'daniel.evans@example.com',
      role: 'Sales Manager',
      status: 'inactive',
      createdAt: '2024-04-25T08:20:00Z',
      department: 'Sales'
    },
    {
      id: 36,
      name: 'Harper Collins',
      email: 'harper.collins@example.com',
      role: 'HR Manager',
      status: 'active',
      createdAt: '2024-04-28T13:45:00Z',
      department: 'Human Resources'
    },
    {
      id: 37,
      name: 'Jackson Stewart',
      email: 'jackson.stewart@example.com',
      role: 'Full Stack Developer',
      status: 'active',
      createdAt: '2024-05-01T10:00:00Z',
      department: 'Engineering'
    },
    {
      id: 38,
      name: 'Evelyn Morris',
      email: 'evelyn.morris@example.com',
      role: 'Financial Analyst',
      status: 'active',
      createdAt: '2024-05-03T15:30:00Z',
      department: 'Finance'
    },
    {
      id: 39,
      name: 'Aiden Rogers',
      email: 'aiden.rogers@example.com',
      role: 'Marketing Coordinator',
      status: 'active',
      createdAt: '2024-05-05T09:15:00Z',
      department: 'Marketing'
    },
    {
      id: 40,
      name: 'Luna Reed',
      email: 'luna.reed@example.com',
      role: 'UI Designer',
      status: 'active',
      createdAt: '2024-05-08T12:20:00Z',
      department: 'Design'
    },
    {
      id: 41,
      name: 'Sebastian Cook',
      email: 'sebastian.cook@example.com',
      role: 'System Administrator',
      status: 'active',
      createdAt: '2024-05-10T11:00:00Z',
      department: 'IT'
    },
    {
      id: 42,
      name: 'Aria Morgan',
      email: 'aria.morgan@example.com',
      role: 'Product Owner',
      status: 'active',
      createdAt: '2024-05-12T14:30:00Z',
      department: 'Product'
    },
    {
      id: 43,
      name: 'Carter Bell',
      email: 'carter.bell@example.com',
      role: 'Software Architect',
      status: 'active',
      createdAt: '2024-05-15T10:45:00Z',
      department: 'Engineering'
    },
    {
      id: 44,
      name: 'Scarlett Murphy',
      email: 'scarlett.murphy@example.com',
      role: 'Brand Manager',
      status: 'active',
      createdAt: '2024-05-18T13:15:00Z',
      department: 'Marketing'
    },
    {
      id: 45,
      name: 'Liam Bailey',
      email: 'liam.bailey@example.com',
      role: 'Customer Success',
      status: 'active',
      createdAt: '2024-05-20T09:30:00Z',
      department: 'Sales'
    },
    {
      id: 46,
      name: 'Chloe Rivera',
      email: 'chloe.rivera@example.com',
      role: 'Recruiter',
      status: 'active',
      createdAt: '2024-05-22T11:45:00Z',
      department: 'Human Resources'
    },
    {
      id: 47,
      name: 'Noah Cooper',
      email: 'noah.cooper@example.com',
      role: 'Security Engineer',
      status: 'active',
      createdAt: '2024-05-25T15:00:00Z',
      department: 'IT'
    },
    {
      id: 48,
      name: 'Zoe Richardson',
      email: 'zoe.richardson@example.com',
      role: 'Business Development',
      status: 'pending',
      createdAt: '2024-05-28T10:20:00Z',
      department: 'Sales'
    },
    {
      id: 49,
      name: 'Mason Cox',
      email: 'mason.cox@example.com',
      role: 'Technical Writer',
      status: 'active',
      createdAt: '2024-06-01T12:00:00Z',
      department: 'Product'
    },
    {
      id: 50,
      name: 'Lily Howard',
      email: 'lily.howard@example.com',
      role: 'Operations Manager',
      status: 'active',
      createdAt: '2024-06-03T14:30:00Z',
      department: 'Operations'
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

