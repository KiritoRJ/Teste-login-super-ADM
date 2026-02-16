
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getPersonalizedGreeting } from '../services/geminiService';

interface WelcomeViewProps {
  user: User;
}

const WelcomeView: React.FC<WelcomeViewProps> = ({ user }) => {
  const [greeting, setGreeting] = useState<string>('Carregando mensagem especial...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      const msg = await getPersonalizedGreeting(user.fullName, user.role);
      setGreeting(msg);
      setLoading(false);
    };
    fetchGreeting();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
          <div className="absolute -bottom-12 left-12">
            <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl">
              <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-indigo-600 text-5xl font-black">
                {user.fullName.charAt(0)}
              </div>
            </div>
          </div>
          <div className="absolute top-6 right-6 flex space-x-2">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/10">
              {user.role} Member
            </span>
          </div>
        </div>

        <div className="pt-16 px-12 pb-12">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
            Olá, <span className="text-indigo-600">{user.fullName.split(' ')[0]}</span>!
          </h1>
          
          <div className="flex items-center space-x-2 text-emerald-500 font-semibold text-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Conectado agora</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <i className="fas fa-quote-right text-9xl"></i>
            </div>
            
            <p className={`text-xl text-slate-600 leading-relaxed font-medium italic ${loading ? 'animate-pulse' : ''}`}>
              "{greeting}"
            </p>
            
            <div className="mt-6 flex items-center space-x-3 text-slate-400 text-xs font-bold uppercase tracking-tighter">
              <i className="fas fa-robot text-indigo-400"></i>
              <span>Mensagem gerada por Gemini AI</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-file-alt text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Documentos</h3>
              <p className="text-sm text-slate-500">Acesse seus arquivos e relatórios pessoais.</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 hover:border-purple-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-tasks text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Tarefas</h3>
              <p className="text-sm text-slate-500">Confira o status das suas atividades pendentes.</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 hover:border-pink-100 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                <i className="fas fa-cog text-xl"></i>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Configurações</h3>
              <p className="text-sm text-slate-500">Ajuste suas preferências de perfil e conta.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-8 text-slate-400">
        <div className="flex items-center space-x-2">
          <i className="fas fa-shield-check text-indigo-500"></i>
          <span className="text-xs font-bold uppercase tracking-widest">Sessão Criptografada</span>
        </div>
        <div className="flex items-center space-x-2">
          <i className="fas fa-history"></i>
          <span className="text-xs font-bold uppercase tracking-widest">Último Login: Hoje</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
