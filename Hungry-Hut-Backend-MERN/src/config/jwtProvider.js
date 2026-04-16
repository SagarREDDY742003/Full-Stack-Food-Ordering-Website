import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function generateToken(userId) {
  return jwt.sign(
    { userId },
    SECRET_KEY,
    { expiresIn: "48h" }
  );
}

export function getUserIdFromToken(token) {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
}