import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Tipos TypeScript para os modelos
export interface Tutor {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  tutorId: number;
}

export interface Medico {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidadeId: number;
}

export interface Especialidade {
  id?: number;
  nome: string;
  descricao: string;
}

export interface Agendamento {
  id?: number;
  dataHora: string;
  observacoes: string;
  petId: number;
  medicoId: number;
}

// Serviços da API
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

export const petService = {
  getAll: () => api.get<Pet[]>('/pets'),
  getById: (id: number) => api.get<Pet>(`/pets/${id}`),
  create: (pet: Omit<Pet, 'id'>) => api.post<Pet>('/pets', pet),
  update: (id: number, pet: Omit<Pet, 'id'>) => api.put<Pet>(`/pets/${id}`, pet),
  delete: (id: number) => api.delete(`/pets/${id}`),
};

export const medicoService = {
  getAll: () => api.get<Medico[]>('/medicos'),
  getById: (id: number) => api.get<Medico>(`/medicos/${id}`),
  create: (medico: Omit<Medico, 'id'>) => api.post<Medico>('/medicos', medico),
  update: (id: number, medico: Omit<Medico, 'id'>) => api.put<Medico>(`/medicos/${id}`, medico),
  delete: (id: number) => api.delete(`/medicos/${id}`),
};

export const especialidadeService = {
  getAll: () => api.get<Especialidade[]>('/especialidades'),
  getById: (id: number) => api.get<Especialidade>(`/especialidades/${id}`),
  create: (especialidade: Omit<Especialidade, 'id'>) => api.post<Especialidade>('/especialidades', especialidade),
  update: (id: number, especialidade: Omit<Especialidade, 'id'>) => api.put<Especialidade>(`/especialidades/${id}`, especialidade),
  delete: (id: number) => api.delete(`/especialidades/${id}`),
};

export const agendamentoService = {
  getAll: () => api.get<Agendamento[]>('/agendamentos'),
  getById: (id: number) => api.get<Agendamento>(`/agendamentos/${id}`),
  create: (agendamento: Omit<Agendamento, 'id'>) => api.post<Agendamento>('/agendamentos', agendamento),
  update: (id: number, agendamento: Omit<Agendamento, 'id'>) => api.put<Agendamento>(`/agendamentos/${id}`, agendamento),
  delete: (id: number) => api.delete(`/agendamentos/${id}`),
};

export default api;