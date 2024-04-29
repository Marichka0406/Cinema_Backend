const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const role = req.headers.role;
  
      if (!role) return res.sendStatus(401);
  
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "You don't have access" });
      }
  
      next();
    };
  };
  
  module.exports = verifyRoles;