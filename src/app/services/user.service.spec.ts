import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User, UserApiResponse } from '../models/user.model';
import { delay, take } from 'rxjs/operators';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllUsers', () => {
    it('should return an Observable of users', (done) => {
      service.getAllUsers().subscribe({
        next: (users: User[]) => {
          expect(users).toBeDefined();
          expect(Array.isArray(users)).toBe(true);
          expect(users.length).toBeGreaterThan(0);
          done();
        },
        error: done.fail,
      });
    });

    it('should return users with correct structure', (done) => {
      service.getAllUsers().subscribe({
        next: (users: User[]) => {
          if (users.length > 0) {
            const user = users[0];
            expect(user.id).toBeDefined();
            expect(user.name).toBeDefined();
            expect(user.email).toBeDefined();
            expect(user.role).toBeDefined();
            expect(user.status).toBeDefined();
            expect(user.createdAt).toBeDefined();
            expect(user.department).toBeDefined();
            expect(typeof user.id).toBe('number');
            expect(typeof user.name).toBe('string');
            expect(typeof user.email).toBe('string');
          }
          done();
        },
        error: done.fail,
      });
    });

    it('should return at least 50 users', (done) => {
      service.getAllUsers().subscribe({
        next: (users: User[]) => {
          expect(users.length).toBeGreaterThanOrEqual(50);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getUsers', () => {
    it('should return paginated users with default pagination', (done) => {
      service.getUsers().subscribe({
        next: (response: UserApiResponse) => {
          expect(response).toBeDefined();
          expect(response.data).toBeDefined();
          expect(response.total).toBeDefined();
          expect(response.page).toBeDefined();
          expect(response.pageSize).toBeDefined();
          expect(response.totalPages).toBeDefined();
          expect(response.page).toBe(1);
          expect(response.pageSize).toBe(10);
          expect(Array.isArray(response.data)).toBe(true);
          done();
        },
        error: done.fail,
      });
    });

    it('should return correct page size', (done) => {
      service.getUsers(1, 5).subscribe({
        next: (response: UserApiResponse) => {
          expect(response.pageSize).toBe(5);
          expect(response.data.length).toBeLessThanOrEqual(5);
          done();
        },
        error: done.fail,
      });
    });

    it('should return correct page number', (done) => {
      service.getUsers(2, 10).subscribe({
        next: (response: UserApiResponse) => {
          expect(response.page).toBe(2);
          done();
        },
        error: done.fail,
      });
    });

    it('should calculate totalPages correctly', (done) => {
      service.getUsers(1, 10).subscribe({
        next: (response: UserApiResponse) => {
          const expectedTotalPages = Math.ceil(
            response.total / response.pageSize
          );
          expect(response.totalPages).toBe(expectedTotalPages);
          done();
        },
        error: done.fail,
      });
    });

    it('should return different data for different pages', (done) => {
      let firstPageData: readonly User[] = [];
      let secondPageData: readonly User[] = [];

      service
        .getUsers(1, 10)
        .pipe(take(1))
        .subscribe({
          next: (response: UserApiResponse) => {
            firstPageData = response.data;
            service
              .getUsers(2, 10)
              .pipe(take(1))
              .subscribe({
                next: (response2: UserApiResponse) => {
                  secondPageData = response2.data;
                  expect(firstPageData[0]?.id).not.toBe(secondPageData[0]?.id);
                  done();
                },
                error: done.fail,
              });
          },
          error: done.fail,
        });
    });

    it('should return empty array for page beyond available data', (done) => {
      service.getUsers(100, 10).subscribe({
        next: (response: UserApiResponse) => {
          expect(response.data.length).toBe(0);
          done();
        },
        error: done.fail,
      });
    });
  });
});
