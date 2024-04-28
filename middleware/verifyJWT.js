const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.sendStatus(401);
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await db.User.findOne({
            where: { email: decoded.email },
            include: { model: db.UserRole }
        });
        if (!user) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.sendStatus(403);
    }
};

module.exports = verifyJWT