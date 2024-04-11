const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req.headers.authorization);
  // Get the token from the request headers in the form Bearer <token>
  const token =
    req.headers.authorization.split(" ")[1] || req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
