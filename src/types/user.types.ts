export type Role = "SUPER_ADMIN" | "ADMIN" | "MEMBER" | "VIEWER";

export type Status = "ACTIVE" | "INVITED" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: Status;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}
