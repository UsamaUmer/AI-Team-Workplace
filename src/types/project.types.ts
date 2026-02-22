export type ProjectStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "ON_HOLD";

export type ProjectVisibility =
  | "PRIVATE"
  | "TEAM";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  members: string[]; // userIds
  createdBy: string; // userId
  aiModel?: string;
  createdAt: string;
  updatedAt: string;
}
