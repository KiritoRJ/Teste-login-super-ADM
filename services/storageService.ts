
import { User } from '../types';

const STORAGE_KEY = 'portal_users';
const SESSION_KEY = 'portal_session';

export const storageService = {
  init: () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const initialAdmin: User = {
        id: '1',
        username: 'wan',
        password: '123',
        fullName: 'Administrador do Sistema',
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([initialAdmin]));
    }
  },

  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  },

  addUser: (user: User): void => {
    const users = storageService.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  deleteUser: (id: string): void => {
    const users = storageService.getUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  setSession: (user: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getSession: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
