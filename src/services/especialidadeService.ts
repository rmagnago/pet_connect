import api from './apiClient';

export interface Especialidade {
  id?: number;
  nome: string;
  descricao: string;
}

export const especialidadeService = {
  getAll: () => api.get<Especialidade[]>('/especialidades'),
  getById: (id: number) => api.get<Especialidade>(`/especialidades/${id}`),
  create: (especialidade: Omit<Especialidade, 'id'>) => api.post<Especialidade>('/especialidades', especialidade),
  update: (id: number, especialidade: Omit<Especialidade, 'id'>) => api.put<Especialidade>(`/especialidades/${id}`, especialidade),
  delete: (id: number) => api.delete(`/especialidades/${id}`),
};

export default especialidadeService;
