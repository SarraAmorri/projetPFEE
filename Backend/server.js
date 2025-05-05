require('dotenv').config(); // Ajout crucial pour les variables d'environnement
const express = require('express');
const connectDB = require('./config/connect');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routes
const userRoutes = require('./routes/user');
const urbanRoutes = require('./routes/urban');
const interurbainRoutes = require('./routes/interurbain');

// Initialisation de l'application
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Configuration CORS plus sécurisée
  credentials: true // Pour les cookies en cross-origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour parser les données de formulaires
app.use(cookieParser());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/urban', urbanRoutes);
app.use('/api/interurbain', interurbainRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});