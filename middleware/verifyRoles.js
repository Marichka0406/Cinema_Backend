const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.UserRoles.map(role => role.role);
        const allowed = allowedRoles.some(role => userRoles.includes(role));
        if (!allowed) {
            return res.status(403).json({ message: 'Sorry! You have no rights!' });
        }
        next();
    };
};

module.exports = verifyRoles