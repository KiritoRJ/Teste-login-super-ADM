
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';

interface AdminDashboardProps {
  currentUser: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // New user state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(storageService.getUsers());
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.some(u => u.username === newUsername)) {
      setMessage({ text: 'Usuário já existe!', type: 'error' });
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: newUsername,
      password: newPassword,
      fullName: newFullName,
      role: 'USER',
      createdAt: new Date().toISOString()
    };

    storageService.addUser(newUser);
    loadUsers();
    setNewUsername('');
    setNewPassword('');
    setNewFullName('');
    setShowForm(false);
    setMessage({ text: 'Usuário cadastrado com sucesso!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleDelete = (id: string) => {
    if (id === '1') {
      alert('Não é possível excluir o administrador padrão.');
      return;
    }
    if (window.confirm('Tem certeza que deseja remover este acesso?')) {
      storageService.deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel Administrativo</h1>
          <p className="text-slate-500 mt-1">Gerencie os acessos e permissões dos usuários do sistema.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            showForm ? 'bg-slate-200 text-slate-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-user-plus'}`}></i>
          <span>{showForm ? 'Cancelar' : 'Cadastrar Novo Usuário'}</span>
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl border flex items-center space-x-3 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
          <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 animate-in zoom-in-95 duration-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Novo Cadastro</h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
              <input
                type="text"
                required
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Usuário de Login</label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ex: joao.silva"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Senha Temporária</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center space-x-2"
              >
                <i className="fas fa-save"></i>
                <span>Salvar Cadastro</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Usuário</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Nível de Acesso</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Data Cadastro</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.role === 'ADMIN' ? 'bg-indigo-500' : 'bg-slate-400'}`}>
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{user.fullName}</div>
                        <div className="text-xs text-slate-500">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.id !== '1' && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remover acesso"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="p-12 text-center">
            <i className="fas fa-users-slash text-4xl text-slate-200 mb-4"></i>
            <p className="text-slate-500">Nenhum usuário cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
