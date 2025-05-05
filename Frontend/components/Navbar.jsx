"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const goToAdminPage = (e) => {
    e.preventDefault();
    router.push("/loginadmin");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-emerald-700 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Lien vers la page d'accueil */}
              <Link href="/accueil" className="flex-shrink-0">
                <span className="text-white text-lg font-bold">
                  SOTREGAMES <span className="text-xs font-normal">الشركة الجهوية للنقل بقابس</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
              <form onSubmit={handleSearch} className="relative flex-grow sm:flex-grow-0">
                <input
                  type="text"
                  placeholder="Rechercher une ligne..."
                  className="py-2 px-4 pr-10 rounded-full text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-emerald-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1.5 text-emerald-600 hover:text-emerald-800 text-lg"
                >
                  <FaSearch />
                </button>
              </form>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setInfoOpen(!infoOpen)}
                  className="flex items-center text-white hover:text-yellow-200 text-sm px-2 py-1"
                >
                  Informations
                  <FaChevronDown className={`ml-1 text-xs transition-transform ${infoOpen ? "rotate-180" : ""}`} />
                </button>
                {infoOpen && (
                  <div className="absolute right-0 mt-1 bg-white shadow-md rounded py-1 w-44 z-50 border border-emerald-100">
                    <Link
                      href="/urbain"
                      className="block px-4 py-2 hover:bg-emerald-50 text-gray-800 text-sm"
                      onClick={() => setInfoOpen(false)}
                    >
                      Lignes urbaines
                    </Link>
                    <Link
                      href="/interurbain"
                      className="block px-4 py-2 hover:bg-emerald-50 text-gray-800 text-sm"
                      onClick={() => setInfoOpen(false)}
                    >
                      Lignes interurbaines
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/demandlocation"
                className="text-white hover:text-yellow-200 text-sm px-3 py-1 hidden sm:block"
              >
                Location
              </Link>

              <button
                onClick={goToAdminPage}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm shadow-lg hover:shadow-xl"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
