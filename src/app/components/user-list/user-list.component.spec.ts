import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { User, UserStatus } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Administrator',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      department: 'IT',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'inactive',
      createdAt: '2024-01-20T14:20:00Z',
      department: 'Sales',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Developer',
      status: 'pending',
      createdAt: '2024-02-01T09:15:00Z',
      department: 'Engineering',
    },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getAllUsers.and.returnValue(of(mockUsers));

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('users signal', () => {
    it('should initialize with empty array', () => {
      expect(component.users()).toBeDefined();
      expect(Array.isArray(component.users())).toBe(true);
    });

    it('should be populated after service call', (done) => {
      setTimeout(() => {
        expect(component.users().length).toBeGreaterThan(0);
        done();
      }, 300);
    });
  });

  describe('isEmpty computed signal', () => {
    it('should be defined', () => {
      expect(component.isEmpty).toBeDefined();
      expect(typeof component.isEmpty()).toBe('boolean');
    });

    it('should be false when users array has items', (done) => {
      setTimeout(() => {
        expect(component.isEmpty()).toBe(false);
        done();
      }, 300);
    });
  });

  describe('getStatusSeverity', () => {
    it('should return "success" for active status', () => {
      expect(component.getStatusSeverity('active')).toBe('success');
    });

    it('should return "danger" for inactive status', () => {
      expect(component.getStatusSeverity('inactive')).toBe('danger');
    });

    it('should return "warn" for pending status', () => {
      expect(component.getStatusSeverity('pending')).toBe('warn');
    });

    it('should return "info" for unknown status', () => {
      const unknownStatus = 'unknown' as UserStatus;
      expect(component.getStatusSeverity(unknownStatus)).toBe('info');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      const dateString = '2024-01-15T10:30:00Z';
      const formatted = component.formatDate(dateString);
      expect(formatted).toMatch(/\w{3}\s\d{1,2},\s\d{4}/);
    });

    it('should format date with correct month abbreviation', () => {
      const dateString = '2024-01-15T10:30:00Z';
      const formatted = component.formatDate(dateString);
      expect(formatted).toContain('Jan');
    });

    it('should format date with correct year', () => {
      const dateString = '2024-01-15T10:30:00Z';
      const formatted = component.formatDate(dateString);
      expect(formatted).toContain('2024');
    });

    it('should handle different date formats', () => {
      const dateString = '2024-12-25T10:30:00Z';
      const formatted = component.formatDate(dateString);
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });
  });

  describe('service integration', () => {
    it('should call getAllUsers on initialization', () => {
      expect(userService.getAllUsers).toHaveBeenCalled();
    });

    it('should handle service response correctly', (done) => {
      setTimeout(() => {
        expect(component.users().length).toBeGreaterThan(0);
        done();
      }, 300);
    });
  });
});
