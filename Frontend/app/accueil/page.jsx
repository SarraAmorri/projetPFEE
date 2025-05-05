"use client";

import React, { useState, useEffect } from "react"; // Garde cette seule ligne d'importation

export default function Accueil() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById("historique");
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionPosition < windowHeight * 0.8) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-lime-50">
      {/* Informations Générales */}
      <section className="py-12 px-4 bg-gradient-to-br from-emerald-200 to-lime-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-emerald-700 mb-8">Informations Générales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-xl rounded-lg">
              <h3 className="font-bold text-emerald-700 text-lg">Dénomination</h3>
              <p className="text-gray-600">SOTREGAMES</p>
            </div>
            <div className="bg-white p-6 shadow-xl rounded-lg">
              <h3 className="font-bold text-emerald-700 text-lg">Forme Juridique</h3>
              <p className="text-gray-600">Société Anonyme</p>
            </div>
            <div className="bg-white p-6 shadow-xl rounded-lg">
              <h3 className="font-bold text-emerald-700 text-lg">Date de Création</h3>
              <p className="text-gray-600">25 Mars 1963</p>
            </div>
            <div className="bg-white p-6 shadow-xl rounded-lg">
              <h3 className="font-bold text-emerald-700 text-lg">Zones d'Activité</h3>
              <p className="text-gray-600">Gabès et Kebili</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historique Section with animation on scroll */}
      <section
        id="historique"
        className={`py-12 bg-gray-100 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-emerald-700 mb-8">Historique</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>
              <strong>1963 :</strong> Naissance de la SOTREGAMES, active dans le transport de voyageurs et marchandises.
            </li>
            <li>
              <strong>1968 :</strong> La Société devient la Société Régionale de Transport de Gabès, en gardant le nom SOTREGAMES.
            </li>
            <li>
              <strong>1988 :</strong> Séparation du transport de voyageurs et de marchandises, avec la création de SOGETRAM.
            </li>
          </ul>
        </div>
      </section>

      {/* Agences Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-emerald-700 mb-8">Nos Agences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Gabès", "Route de Médenine Gabès", "75 279 250"],
              ["Kebili", "Av Habib Bourguiba Kebili", "75 490 036"],
              ["El Hamma", "Rue Bechir Derbala El Hamma", "75 331 005"],
              ["Mareth", "Av 27 octobre Mareth", "75 321 062"],
              ["Matmata", "Av Mohamed Ali Nouvelle Matmata", "75 230 591"],
              ["Douz", "Gare routière Douz", "75 470 447"]
            ].map(([city, address, phone], index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-xl rounded-lg transition-transform hover:scale-105 duration-300"
              >
                <h3 className="font-semibold text-emerald-700 text-xl">{city}</h3>
                <p className="text-gray-600">{address}</p>
                <p className="text-sm text-gray-500">{phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
