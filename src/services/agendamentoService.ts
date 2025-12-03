import api from './apiClient';

export interface AgendamentoPayload {
  dtHora?: string; // ISO date (opcional)
  status?: boolean;
  medico: { id: number };
  tutor: { id: number };
  pet?: { id: number } | null;
}

const agendamentoService = {
  // listar por tutor
  getByTutor: (tutorId: number) => api.get(`/consultas/tutor/${tutorId}`),
  // listar por médico
  getByMedico: (medicoId: number) => api.get(`/consultas/medico/${medicoId}`),
  // tutor solicita consulta
  solicitar: (payload: AgendamentoPayload) => api.post('/consultas/solicitar', payload),
  // médico aceita consulta
  aceitar: (id: number) => api.put(`/consultas/${id}/aceitar`),
};

export default agendamentoService;