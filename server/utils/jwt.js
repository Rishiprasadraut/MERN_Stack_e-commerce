const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    )
}


module.exports = generateToken;