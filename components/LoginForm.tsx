
import React, { useState } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = storageService.getUsers();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Usuário ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex bg-indigo-100 p-4 rounded-full mb-4">
              <i className="fas fa-lock text-3xl text-indigo-600"></i>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Acesso Restrito</h1>
            <p className="text-slate-500 mt-2">Bem-vindo de volta! Faça login para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center space-x-3">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Usuário</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  placeholder="Seu nome de usuário"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Senha</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Entrar no Sistema</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Esqueceu sua senha? Entre em contato com o <span className="text-indigo-600 font-semibold cursor-pointer">Administrador</span>.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">v1.0 Secure Portal</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">Servidor Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
