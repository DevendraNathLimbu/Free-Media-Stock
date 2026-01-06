import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    url: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;