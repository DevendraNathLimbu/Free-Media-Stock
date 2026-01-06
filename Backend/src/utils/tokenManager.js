import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (user) => {
    const payload = {
        username: user.username,
        password: user.password
    }
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

 export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}