'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';
import { FaExclamationCircle } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'

  // Identifiants admin prédéfinis
  const ADMIN_LOGIN = "admin";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (loginType === 'admin') {
        // Vérification des identifiants admin
        if (email === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
          localStorage.setItem("adminConnected", "true");
          setSuccess('Connexion admin réussie ! Redirection...');
          setTimeout(() => router.push('/menuadmin'), 1000);
        } else {
          setError('Identifiants admin incorrects');
        }
      } else {
        // Vérification des identifiants utilisateur
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError('Email invalide.');
          return;
        }

        const result = await loginUser({ email, password });
        setSuccess('Connexion réussie ! Redirection...');
        localStorage.setItem('token', result.token);
        setTimeout(() => router.push('/interurbain'), 1000);
      }
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la connexion.');
      console.error('Erreur lors de la connexion :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 via-emerald-100 to-lime-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">Connexion</h1>
        
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setLoginType('user')}
              className={`px-4 py-2 rounded-md transition ${
                loginType === 'user' ? 'bg-emerald-600 text-white' : 'text-gray-600'
              }`}
            >
              Utilisateur
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`px-4 py-2 rounded-md transition ${
                loginType === 'admin' ? 'bg-emerald-600 text-white' : 'text-gray-600'
              }`}
            >
              Administrateur
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
            <FaExclamationCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 bg-green-50 border border-green-200 text-green-600 rounded-md text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {loginType === 'admin' ? 'Login' : 'Adresse e-mail'}
            </label>
            <input
              id="email"
              type={loginType === 'admin' ? 'text' : 'email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder={loginType === 'admin' ? 'Entrez votre login' : 'Entrez votre email'}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {loginType === 'user' && (
          <div className="text-center mt-6">
            <p className="text-gray-600 mb-2">Vous n'avez pas encore de compte ?</p>
            <button
              onClick={() => router.push('/register')}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Créer un nouveau compte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
