import jwt from "jsonwebtoken";

// Purpose for authMiddleware is to check if the user is authenticated or not.
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check if authHeader is valid
  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  // Grab the token after validating authHeader
  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Pass the user info "decoded" to the req object by adding a new property "user"
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: `Unauthorized`,
    });
  }
};
