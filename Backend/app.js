import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { protector } from './src/middleware/auth.protector.js';
import Cart from './src/models/cart.model.js';
import { generateToken, verifyToken } from './src/utils/tokenManager.js';

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
    origin: ["http://localhost:5173",
            "http://192.168.1.76:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
    req.currUser = await User.findOne({ username }).select('-password');

    return res.status(200).json({ message: 'Login successful', token, currUser: req.currUser });
} catch (error) {
    return res.status(500).json({ message: 'Server error' });
}
});

app.post('/collected', async (req, res) => {
    const {url, id} = req.body;
    try {
        if (!url || !id) {
            console.log(`no url and id, url: ${url}, id: ${id}`);
      return res.status(400).json({ message: "url or user id missing" });
    }

    const user = await User.findById(id);
    if (!user) {
        console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }
        const cart = new Cart({ userId: id, url: url });
        await cart.save();

        user.urls.push(cart._id);
        await user.save();
        console.log(cart);
        return res.status(200).json({ message: 'URL added to collection', cart: cart });
    }
    catch (error) {
        console.log("error");
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/uncollected', protector, async (req, res) => {
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

app.get('/collections', protector, async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.currUser._id });
        return res.status(200).json({ carts });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});