const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

  // ... vérification mot de passe ici ...

  const token = jwt.sign(
    { id: user._id, role: user.role }, // ⚠️ Inclure le rôle ici
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};
