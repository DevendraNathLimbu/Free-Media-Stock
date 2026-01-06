import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { protector } from './src/middleware/auth.protector.js';
import Cart from './src/models/cart.model.js';

dotenv.config();

const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockdb';

const connectDB = async () => {
    try {
        await mongoose.connect(MongoDB_URI).then(() => {
            console.log('Connected to MongoDB');
        });
    }catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
    const payload = {
        username: user.username,
        password: user.password
    }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
    const match = await User.findOne({ username });
    if (match) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = generateToken(user);
    verifyToken(token);
    return res.status(201).json({ message: 'User created successfully', token });
    }
    catch (error) {
    return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = generateToken(user);
    const isVerified = verifyToken(token);

    if (!user | !isMatch | !isVerified) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', token, currUser: req.currUser });
} catch (error) {
    return res.status(500).json({ message: 'Server error' });
}
});

app.get('/collected', protector, async (req, res) => {
    const {url, id} = req.body;
    try {
        const cart = new Cart({ userId: id, url: url });
        cart.save();
        const user = await User.findById(id);
        user.urls.push(cart._id);
        await user.save();
        return res.status(200).json({ message: 'URL added to collection', cart });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/uncollected', protector, async (req, res) => {
    const {url, id} = req.body;
    try {
        const cart = await Cart.findOneAndDelete({ userId: id, url: url });
        const user = await User.findById(id);
        user.urls.pull(cart._id);
        await user.save();
        return res.status(200).json({ message: 'URL removed from collection', cart });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});