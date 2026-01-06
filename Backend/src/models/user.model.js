import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

const MongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockdb';

// const connectDB = async () => {
//     try {
//         await mongoose.connect(MongoDB_URI).then(() => {
//             console.log('Connected to MongoDB');

//             const user = new User({ username: 'admin', password: 'admin123' });
//             user.save().then(() => {
//                 console.log('Default admin user created');
//             }).catch(err => {
//                 if (err.code === 11000) {
//                     console.log('Admin user already exists');
//                 } else {
//                     console.error('Error creating admin user:', err);
//                 }
//             });
//         });
//     }catch (error) {
//         console.error('MongoDB connection error:', error);
//     }
// }

// connectDB();
