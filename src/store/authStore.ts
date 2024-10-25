import { create } from 'zustand';
import { AuthState } from '../types/auth';

// Simulated API calls - replace with actual backend integration
const mockLogin = async (email: string, password: string) => {
  // Simulate different responses for admin and user
  if (email.includes('admin')) {
    return {
      id: '1',
      email,
      role: 'ADMIN' as const,
      name: 'Admin User',
      permissions: ['ALL'],
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  } else {
    return {
      id: '2',
      email,
      role: 'USER' as const,
      name: 'Regular User',
      permissions: ['VIEW_DRUGS', 'UPDATE_DRUGS'],
      createdAt: new Date(),
      lastLogin: new Date(),
    };
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await mockLogin(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'Invalid credentials', isLoading: false });
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  verify2FA: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate 2FA verification
      if (code === '123456') {
        set({ isLoading: false });
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      set({ error: 'Invalid 2FA code', isLoading: false });
      throw error;
    }
  },
}));