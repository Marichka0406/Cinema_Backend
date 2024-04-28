const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await db.RefreshToken.findOne({ where: { token: refreshToken } });
        if (!storedToken || storedToken.UserId !== decoded.id) {
            return res.sendStatus(403);
        }
        const user = await db.User.findByPk(storedToken.UserId, { include: { model: db.UserRole } });
        if (!user) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
            { email: user.email, roles: user.UserRoles.map(role => role.role) },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ accessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.sendStatus(403);
    }
};

module.exports = { handleRefreshToken }