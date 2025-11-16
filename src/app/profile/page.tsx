"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBarHome } from '@/components/topBarHome';
import medicoService from '@/services/medicoService';
import tutorService from '@/services/tutorService';

type UserStorage = {
  role: 'MEDICO' | 'TUTOR';
  id: number;
  nome: string;
  email: string;
};

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserStorage | null>(null);

  // form state
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [extra, setExtra] = useState(''); // crmv or cpf (read-only)

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      router.push('/login');
      return;
    }
    try {
      const parsed: UserStorage = JSON.parse(raw);
      setUser(parsed);
      // fetch full details
      if (parsed.role === 'MEDICO') {
        medicoService.getById(parsed.id).then(res => {
          const m: any = res.data;
          setNome(m.nome || '');
          setEmail(m.email || '');
          setTelefone(m.telefone || '');
          setEndereco(m.endereco || '');
          setExtra(m.crmv || '');
          setLoading(false);
        }).catch(err => {
          console.error('Erro ao carregar médico', err);
          setLoading(false);
        });
      } else {
        tutorService.getById(parsed.id).then(res => {
          const t: any = res.data;
          setNome(t.nome || '');
          setEmail(t.email || '');
          setTelefone(t.telefone || '');
          setEndereco(t.endereco || '');
          setExtra(t.cpf || '');
          setLoading(false);
        }).catch(err => {
          console.error('Erro ao carregar tutor', err);
          setLoading(false);
        });
      }
    } catch (e) {
      console.error('user parse error', e);
      router.push('/login');
    }
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const payload: any = {
      nome,
      email,
      telefone,
      endereco,
    };
    try {
      if (user.role === 'MEDICO') {
        await medicoService.update(user.id, payload as any);
      } else {
        await tutorService.update(user.id, payload as any);
      }
      // Atualiza localStorage
      const updatedUser = { ...user, nome, email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert('Perfil atualizado com sucesso.');
    } catch (err: any) {
      console.error('Erro ao atualizar perfil', err);
      if (err.response) {
        alert(`Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      } else {
        alert('Erro ao atualizar perfil. Verifique o console.');
      }
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#C5E5E3] text-teal-800">
      <TopBarHome />
      <div className="flex flex-col items-center justify-center mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input value={nome} onChange={e => setNome(e.target.value)} className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Endereço</label>
              <input value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full p-3 border rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{user?.role === 'MEDICO' ? 'CRMV' : 'CPF'}</label>
              <input value={extra} readOnly className="w-full p-3 border rounded-md bg-gray-100" />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-teal-700 text-white py-2 px-6 rounded-md">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
  