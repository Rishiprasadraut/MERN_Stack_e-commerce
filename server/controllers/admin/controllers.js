const Product = require("../../model/Product")
const Order = require("../../model/Order")
const User = require("../../model/User")

exports.getAdminStats = async (req, res) => {
    try {
          const totalProducts = await Product.countDocuments({isActive: true});
          const totalUsers = await User.countDocuments();
          const totalOrders = await Order.countDocuments();

          const orders = await Order.find({orderStatus: "Delivered"});

          const revenue = orders.reduce((total, order) => total + order.totalPrice, 0);
   
           res.status(200).json({  
          totalProducts,
          totalUsers,
          totalOrders,
          revenue,
        });

    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}