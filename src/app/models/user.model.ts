export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly status: UserStatus;
  readonly createdAt: string;
  readonly department: string;
}

export interface UserApiResponse {
  readonly data: readonly User[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

