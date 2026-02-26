// app/store.ts
import { create } from "zustand";

import type { User } from "../types/user.types";
import type { Project } from "../types/project.types";
import type { Activity } from "../types/activity.types";

import { users, projects, activities, USER_IDS } from "../data/seed";

/* =======================
   App State Interface
======================= */
export interface AppState {
  /* -------------------
     STATE
  ------------------- */
  currentUser: User | null;
  users: User[];
  projects: Project[];
  activities: Activity[];

  /* -------------------
     ACTIONS / MUTATIONS
  ------------------- */
  login: (email: string, password: string) => boolean;
  setCurrentUser: (user: User | null) => void;
  createUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteUser: (id: string) => void;
  addActivity: (activity: Activity) => void;
  resetStore: () => void;
  logout: () => void;
}

/* =======================
   Zustand Store
======================= */
const nowISO = () => new Date().toISOString();

let initialUser: User | null = null;
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    try {
      initialUser = JSON.parse(storedUser);
    } catch {
      initialUser = null;
    }
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  /* -------------------
     STATE
  ------------------- */
  currentUser: initialUser,
  users,
  projects,
  activities,

  /* -------------------
     ACTIONS / MUTATIONS
  ------------------- */
  // login validation

  login: (email: string, password: string) => {
    const state = get();
    const user = state.users.find((u) => {
      return u.email === email;
    });

    if (!user) {
      return false;
    }

    if (user.password !== password) {
      return false;
    }

    if (user.status !== "ACTIVE") {
      return false;
    }

    const updatedUser = { ...user, lastLogin: nowISO(), updatedAt: nowISO() };

    const loginActivity: Activity = {
      id: crypto.randomUUID(),
      userId: user.id,
      action: "USER_LOGIN",
      entityType: "USER",
      entityId: user.id,
      timestamp: nowISO(),
      metadata: { name: user.name, email: user.email },
    };

    // ✅ Single set call for all updates
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    set((state) => ({
      currentUser: updatedUser,
      users: state.users.map((u) => (u.id === user.id ? updatedUser : u)),
      activities: [...state.activities, loginActivity],
    }));

    // login successfully
    return true;
  },
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
  // Set or switch current user
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
    set({ currentUser: user });
  },

  // Add a new user
  createUser: (user) => set((state) => ({ users: [...state.users, user] })),

  // Update existing user by ID
  updateUser: (id, data) =>
    set((state) => {
      const updatedUsers = state.users.map((u) =>
        u.id === id ? { ...u, ...data, updatedAt: nowISO() } : u,
      );

      // If current user is the one being updated, sync localStorage
      let updatedCurrentUser = state.currentUser;
      if (state.currentUser?.id === id) {
        updatedCurrentUser = {
          ...state.currentUser,
          ...data,
          updatedAt: nowISO(),
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
      }

      return {
        users: updatedUsers,
        currentUser: updatedCurrentUser,
      };
    }),

  // Add a new project
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  // Update existing project by ID
  updateProject: (id, data) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? { ...p, ...data, updatedAt: new Date().toISOString() }
          : p,
      ),
    })),

  // Add a new activity
  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),

  // Reset entire store to initial seed
  resetStore: () => {
    localStorage.removeItem("currentUser");
    set({
      currentUser: users.find((u) => u.id === USER_IDS.SUPER_ADMIN) || null,
      users,
      projects,
      activities,
    });
  },

  // Logout current user
  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },
}));
