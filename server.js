const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = "your_secret_key";

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Pedro_Nero:Pedro_515@web-1.c5u5a.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose schemas / models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  additionalInfo: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const User = mongoose.model('User', userSchema);
const Pet = mongoose.model('Pet', petSchema);

// Rotas
// Rot Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Petshop API!');
});

// User Registra
app.post('/register', async (req, res) => {
  try {
    const { username, password, cpf, email } = req.body;

    if (!username || !password || !cpf || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length > 10) {
      return res.status(400).json({ message: 'Password must be 10 characters or less' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      cpf,
      email,
    });
    const newUser = await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Middleware to authenticate users
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = user.id;
    next();
  });
}

// CRUD

// Registrar Pet
app.post('/pets', authenticateToken, async (req, res) => {
  try {
    const { name, type, age, additionalInfo } = req.body;

    if (!name || !type || !age) {
      return res.status(400).json({ message: 'Name, type, and age are required' });
    }

    const pet = new Pet({
      name,
      type,
      age,
      additionalInfo,
      owner: req.userId,
    });
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: 'Error creating pet', error: err.message });
  }
});

// ft Pets
app.get('/pets', authenticateToken, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.userId });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
  }
});

// Atualizae Pet
app.put('/pets/:id', authenticateToken, async (req, res) => {
  try {
    const { name, type, age, additionalInfo } = req.body;

    if (!name || !type || !age) {
      return res.status(400).json({ message: 'Name, type, and age are required' });
    }

    const updatedPet = await Pet.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { name, type, age, additionalInfo },
      { new: true }
    );
    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found or not authorized' });
    }
    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: 'Error updating pet', error: err.message });
  }
});

// Del Pet
app.delete('/pets/:id', authenticateToken, async (req, res) => {
  try {
    const deletedPet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found or not authorized' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting pet', error: err.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
