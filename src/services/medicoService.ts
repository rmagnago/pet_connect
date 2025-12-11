import api from './apiClient';

export interface Medico {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  crmv: string;
  especialidade?: {
    id: number;
    nome: string;
  };
  endereco: string;
  cidade?: string;
  latitude?: number;
  longitude?: number;
}

export const medicoService = {
  getAll: () => api.get<Medico[]>('/medicos'),
  getById: (id: number) => api.get<Medico>(`/medicos/${id}`),
  getByEspecialidade: (especialidadeId: number) => api.get<Medico[]>(`/medicos/especialidade/${especialidadeId}`),
  getByCidade: (cidade: string) => api.get<Medico[]>(`/medicos/cidade/${cidade}`),
  buscarComFiltros: (especialidadeId?: number, especId?: number | undefined, cidade?: string) => 
    api.get<Medico[]>('/medicos/buscar', { params: {especialidadeId, cidade } }),
  create: (medico: Omit<Medico, 'id'>) => api.post<Medico>('/medicos', medico),
  update: (id: number, medico: Omit<Medico, 'id'>) => api.put<Medico>(`/medicos/${id}`, medico),
  delete: (id: number) => api.delete(`/medicos/${id}`),
};

export default medicoService;
