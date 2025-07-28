const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, products: [] });
};

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, products: [] });
    }
    const existing = cart.products.find(p => p.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.products.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
};
