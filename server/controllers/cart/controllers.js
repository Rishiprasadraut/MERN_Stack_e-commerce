const Cart = require("../../model/Cart");
const Product = require("../../model/Product");


//Add to Cart

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product not found" });

        }
        if (product.countInStock < quantity) {
            return res.status(400).json({ message: "Product out of stock" });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
        }

        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, price: product.price, });
        }
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// GET CART

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }
         cart.items = cart.items.filter(
                (item) => item.product !== null
            );
           
            cart.totalPrice = cart.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            await cart.save();

            res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//Update cart

exports.updateCartQty = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate stock availability
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (quantity > product.countInStock) {
      return res.status(400).json({ message: `Only ${product.countInStock} units available in stock` });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//Clear Cart

exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user._id });
        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
