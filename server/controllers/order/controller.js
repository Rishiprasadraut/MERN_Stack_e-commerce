const Order = require("../../model/Order");
const Cart = require("../../model/Cart");
const Product = require("../../model/Product");

// Place Order

exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });

        }

        for (let item of cart.items) {
            if (item.product.countInStock < item.quantity) {
                return res.status(400).json({ message: `Product ${item.product.name} is out of stock` });
            }
        }

        const order = await Order.create({
            user: req.user._id,
            orderItems: cart.items.map((item) => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.price,
            })),
            shippingAddress: req.body.shippingAddress,
            totalPrice: cart.totalPrice,
            paymentMethod: "COD",
            paymentStatus: "PENDING",
        });

        for (let item of cart.items) {
            item.product.countInStock -= item.quantity;
            await item.product.save();
        }

        await Cart.findByIdAndDelete(cart._id);

        return res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
}

//user orders

exports.getMyOrders = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//admin all orders

exports.getAllOrders = async (req, res) => {
try {    
        const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const validTransitions = {
    Pending: ["Shipped", "Cancelled"],
    Shipped: ["Delivered", "Cancelled"],
    Delivered: [],
    Cancelled: [],
}
// Admin update status

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id).populate("orderItems.product");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const Allowed = validTransitions[order.orderStatus].includes(status);
        if (!Allowed) {
            return res.status(400).json({ message: `Cannot change status from ${order.orderStatus} to ${status}` });
        }

    // Restore stock if cancelling order
    if (status === "Cancelled") {
        for (let item of order.orderItems) {
            if (item.product) {
                item.product.countInStock += item.quantity;
                await item.product.save();
            }
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.paymentStatus = "PAID";
    }
    await order.save();

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("orderItems.product");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Security: user owns order?
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access Denied" });
        }

        // Cannot cancel delivered order
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ message: "Delivered order cannot be cancelled" });
        }

        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({ message: "Order already cancelled" });
        }

        //Restore Stock

        for (let item of order.orderItems) {
            item.product.countInStock += item.quantity;
            await item.product.save();
        }

        order.orderStatus = "Cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



exports.adminCancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("orderItems.product");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({ message: "Delivered order cannot be cancelled" });
        }

        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({ message: "Order already cancelled" });
        }

        for (let item of order.orderItems) {
            item.product.countInStock += item.quantity;
            await item.product.save();
        }

        order.orderStatus = "Cancelled";
        await order.save();

        res.json({ message: "Order cancelled successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


