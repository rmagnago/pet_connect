import api from './apiClient';

export interface AvaliacaoPayload {
  comentario?: string;
  nota: number; // 1-5
}

const avaliacaoService = {
  // cria/atualiza avaliação para um agendamento específico
  avaliarAgendamento: (agendamentoId: number, payload: AvaliacaoPayload) =>
    api.post(`/avaliacoes/por-agendamento/${agendamentoId}`, payload),
};

export default avaliacaoService;