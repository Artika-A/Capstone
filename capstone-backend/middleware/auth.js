const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log ("No token provided")
    return res.sendStatus(401).json({message:"Token missing"});
  } 
  
  
  const token = authHeader.split(" ")[1];

  jwt.verify(token, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", (err, decoded) => {
    if (err) {
      console.log("Invalid token")
      return res.sendStatus(403).json({message: "Invalid token"});
    }
    
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;