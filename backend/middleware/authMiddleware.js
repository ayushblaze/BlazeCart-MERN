import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("made it inside");
    try {
      console.log("try");
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (e) {
      console.log("catch")
      console.error(e);
      res.status(401);
      throw new Error("Not authorized to perform this action 🔒");
    }
  }

  if (!token) {
    res.status(401).send("Not authorized to perform this action");
  }

  next();
});

export { protect }; 