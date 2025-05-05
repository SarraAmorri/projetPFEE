const API_URL = "http://localhost:5000/api/users"; // Modifie si ton backend change d'URL

// Fonction d'inscription
export const registerUser = async (formData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nom: formData.nom,
      prenom: formData.prenom,
      numcin: formData.cin,
      address: formData.adresse,
      email: formData.email,
      tel: formData.tel,
      password: formData.password,
      role: "user", // valeur par défaut
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur lors de l'inscription");
  }

  return response.json();
};

// Fonction de connexion
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur lors de la connexion");
  }

  return response.json(); // Tu peux stocker le token ici après
};
