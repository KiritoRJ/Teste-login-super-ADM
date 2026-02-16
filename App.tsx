
import React, { useState, useEffect } from 'react';
import { User, AuthState } from './types';
import { storageService } from './services/storageService';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import WelcomeView from './components/WelcomeView';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize DB and Check session
    storageService.init();
    const session = storageService.getSession();
    if (session) {
      setAuth({ user: session, isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    storageService.setSession(user);
    setAuth({ user, isAuthenticated: true });
  };

  const handleLogout = () => {
    storageService.clearSession();
    setAuth({ user: null, isAuthenticated: false });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout user={auth.user!} onLogout={handleLogout}>
      {auth.user?.role === 'ADMIN' ? (
        <AdminDashboard currentUser={auth.user} />
      ) : (
        <WelcomeView user={auth.user!} />
      )}
    </Layout>
  );
};

export default App;
