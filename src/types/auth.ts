export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
  name: string;
  institution?: string;
  permissions: string[];
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verify2FA: (code: string) => Promise<void>;
}

export interface AdminSignupData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}