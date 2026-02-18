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
   
          // Generate chart data for last 6 months
          const chartData = [];
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const now = new Date();
          
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
            const monthName = months[date.getMonth()];
            
            // Get orders for this month
            const monthOrders = await Order.find({
              createdAt: {
                $gte: date,
                $lt: nextMonth
              }
            });
            
            // Calculate sales (total revenue) and order count
            const sales = monthOrders.reduce((total, order) => total + order.totalPrice, 0);
            const ordersCount = monthOrders.length;
            
            chartData.push({
              name: monthName,
              sales: sales,
              orders: ordersCount
            });
          }

           res.status(200).json({  
          totalProducts,
          totalUsers,
          totalOrders,
          revenue,
          chartData,
        });

    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}