export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  department: string;
}

export interface UserApiResponse {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

