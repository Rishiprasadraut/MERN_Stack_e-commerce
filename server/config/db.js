const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce" );
        console.log("Database Connected Successfully")
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
}


module.exports = connectDB;







