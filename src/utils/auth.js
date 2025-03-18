import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
