
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fas fa-shield-alt text-white"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              AccessPortal
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold text-slate-700">{user.fullName}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">{user.role}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium border border-slate-200"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} AccessPortal - Sistema de Gestão de Acessos
      </footer>
    </div>
  );
};

export default Layout;
