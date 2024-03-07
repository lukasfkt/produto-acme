import { create } from "zustand";
import { api } from "../services/axios";

export interface Task {
  uuid?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface useTasksProps {
  tasks: Task[];
  pagination: Pagination;
  listTasks: (page: number, search?: string) => Promise<{ success: boolean }>;
  createTask: (task: Task) => Promise<{ success: boolean }>;
  updateTask: (task: Task) => Promise<{ success: boolean }>;
  deleteTask: (task: Task) => Promise<{ success: boolean }>;
}

export const useTasks = create<useTasksProps>((set, get) => ({
  tasks: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
  },

  listTasks: async (page: number, search?: string) => {
    try {
      const response = await api.get(
        `/tasks?page=${page}${search ? "&search=" + search : ""}`
      );
      set({ tasks: response.data.tasks, pagination: response.data.pagination });
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  },

  createTask: async (task: Task) => {
    try {
      const response = await api.post("/tasks", task);
      set({ tasks: [...get().tasks, response.data.task] });
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  },

  updateTask: async (task: Task) => {
    try {
      await api.put(`/tasks/${task.uuid}`, task);
      set({ tasks: get().tasks.map((t) => (t.uuid === task.uuid ? task : t)) });
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  },

  deleteTask: async (task: Task) => {
    try {
      await api.delete(`/tasks/${task.uuid}`);
      set({ tasks: get().tasks.filter((t) => t.uuid !== task.uuid) });
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  },
}));
