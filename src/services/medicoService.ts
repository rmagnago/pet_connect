import api from './apiClient';

export interface Medico {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidadeId: number;
}

export const medicoService = {
  getAll: () => api.get<Medico[]>('/medicos'),
  getById: (id: number) => api.get<Medico>(`/medicos/${id}`),
  create: (medico: Omit<Medico, 'id'>) => api.post<Medico>('/medicos', medico),
  update: (id: number, medico: Omit<Medico, 'id'>) => api.put<Medico>(`/medicos/${id}`, medico),
  delete: (id: number) => api.delete(`/medicos/${id}`),
};

export default medicoService;
