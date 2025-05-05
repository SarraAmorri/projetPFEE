'use client'
import MenuAdmin from './MenuAdmin'

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-emerald-800 text-white p-4">
        <MenuAdmin />
      </div>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
