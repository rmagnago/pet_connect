import api from './apiClient';

export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  tutorId: number;
}

export const petService = {
  getAll: () => api.get<Pet[]>('/pets'),
  getById: (id: number) => api.get<Pet>(`/pets/${id}`),
  create: (pet: Omit<Pet, 'id'>) => api.post<Pet>('/pets', pet),
  update: (id: number, pet: Omit<Pet, 'id'>) => api.put<Pet>(`/pets/${id}`, pet),
  delete: (id: number) => api.delete(`/pets/${id}`),
};

export default petService;
