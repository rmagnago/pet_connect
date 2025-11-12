import api from './apiClient';

export interface Tutor {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf: string;
  senha?: string;
}

export const tutorService = {
  getAll: () => api.get<Tutor[]>('/tutores'),
  getById: (id: number) => api.get<Tutor>(`/tutores/${id}`),
  getByEmail: (email: string) => api.get<Tutor>(`/tutores/email/${email}`),
  getByCpf: (cpf: string) => api.get<Tutor>(`/tutores/cpf/${cpf}`),
  getByTelefone: (telefone: string) => api.get<Tutor>(`/tutores/telefone/${telefone}`),
  getByNome: (nome: string) => api.get<Tutor[]>(`/tutores/nome/${nome}`),
  create: (tutor: Omit<Tutor, 'id'>) => api.post<Tutor>('/tutores', tutor),
  update: (id: number, tutor: Omit<Tutor, 'id'>) => api.put<Tutor>(`/tutores/${id}`, tutor),
  delete: (id: number) => api.delete(`/tutores/${id}`),
};

export default tutorService;
