// middleware/verifyUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const verifyRole = (roles) => {
    return async (req, res, next) => {
        if (!roles) {
            next();
            return;
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied: Role not allowed for this resource' });
        }
        next();
    }
}

const ensureAuthenticated = async (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'User deleted or not found' });
      }
  
      req.user = user; 
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
  

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User deleted or not found' });
    }

    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }
    next();
  };


module.exports = {
    verifyUser,
    verifyAdmin,
    verifyRole,
    ensureAuthenticated
}