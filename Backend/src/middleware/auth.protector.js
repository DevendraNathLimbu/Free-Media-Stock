import { verifyToken } from '../utils/tokenManager.js';
import User from '../models/user.model.js';

export const protector = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.currUser = await User.findOne({ username: decoded.username }).select('-password');
    console.log(req.currUser);
    next();
}