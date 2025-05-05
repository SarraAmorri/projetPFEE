'use client'
import Navbar from '../components/Navbar'  

export default function accueil() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Sotregames - الشركة الجهوية للنقل بقابس
          </h1>
          <p className="text-lg mb-6">
            Notre objectif est de vous offrir des prestations conformes à vos attentes
            dans des conditions de confort, de sécurité et de bon accueil.
          </p>
          <button
            onClick={() => window.location.href = '/informations'}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            Voir les lignes
          </button>
        </div>
      </section>
    </div>
  )
}
