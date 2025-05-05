import React from 'react'

const page = () => {
  return (
    <div>
      
      <main className="min-h-[calc(100vh-56px)] py-16">
        <section className="px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-200 to-lime-200 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12">
              <h1 className="text-4xl font-extrabold text-emerald-800 tracking-tight leading-tight mb-3">
                SOTREGAMES
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Société Régionale de Transport de Gabès <span className="font-semibold">depuis 1963</span>
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Dénomination", "SOTREGAMES"],
                ["Forme Juridique", "SA"],
                ["Création", "25/03/1963"],
                ["Zones", "Gabès et Kebili"],
              ].map(([title, value], index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">{title}</h3>
                  <p className="text-md text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-emerald-800 tracking-tight mb-8 text-center">Historique</h2>
            <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mr-4 text-sm font-medium">1963</span>
                  <p className="text-lg text-gray-800">Création de SOTREGAMES (transport voyageurs et marchandises)</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mr-4 text-sm font-medium">1968</span>
                  <p className="text-lg text-gray-800">Devient Société Régionale de Transport de Gabès</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 mr-4 text-sm font-medium">1988</span>
                  <p className="text-lg text-gray-800">Création de SOGETRAM pour les marchandises</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-emerald-800 tracking-tight mb-8 text-center">Agences</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Gabès", "Route de Médenine", "75 279 250"],
                ["Kebili", "Av Habib Bourguiba", "75 490 036"],
                ["El Hamma", "Rue Bechir Derbala", "75 331 005"],
                ["Mareth", "Av 27 octobre", "75 321 062"],
              ].map(([city, address, phone], index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">{city}</h3>
                  <p className="text-md text-gray-700 mb-4">{address}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tél:</span> {phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page