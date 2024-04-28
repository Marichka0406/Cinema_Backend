const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({
            where: { email },
            include: { model: db.UserRole }
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const roles = user.UserRoles.map(role => role.role);
        const accessToken = jwt.sign(
            { email, roles },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        await db.RefreshToken.create({ token: refreshToken, UserId: user.id });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handleLogin };