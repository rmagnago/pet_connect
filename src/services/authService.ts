import api from './apiClient';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  role: 'MEDICO' | 'TUTOR';
  id: number;
  nome: string;
  email: string;
}

const authService = {
  login: (payload: LoginRequest) => api.post<LoginResponse>('/auth/login', payload),
};

export default authService;
