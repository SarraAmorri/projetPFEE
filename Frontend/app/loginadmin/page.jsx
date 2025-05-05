"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaExclamationCircle } from "react-icons/fa"

export default function AdminLogin() {
  const router = useRouter()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Identifiants admin prédéfinis
  const ADMIN_LOGIN = "admin"
  const ADMIN_PASSWORD = "admin123"

  const handleLogin = (e) => {
    e.preventDefault()

    // Vérification des identifiants
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      // Stockage de l'information de connexion
      localStorage.setItem("adminConnected", "true")
      // Redirection vers le menu admin
      router.push("/menuadmin")
    } else {
      setError("Identifiants incorrects")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 via-emerald-100 to-lime-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg">
        <div className="p-6 pb-2">
          <h1 className="text-3xl font-bold text-center text-emerald-700">Connexion Admin</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                Login
              </label>
              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3 mt-2 bg-red-50 border border-red-200 text-red-600 rounded-md">
                <FaExclamationCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition"
            >
              Connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}