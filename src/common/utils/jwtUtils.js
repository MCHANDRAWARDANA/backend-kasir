const jwt = require("jsonwebtoken");

// Fungsi untuk menghasilkan token JWT
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  // Hanya melakukan logging secret jika bukan di lingkungan produksi
  if (process.env.NODE_ENV !== "production") {
    console.log("JWT_SECRET:", secret);
  }
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};

// Fungsi untuk memverifikasi token JWT dengan penanganan error
const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};

module.exports = { generateToken, verifyToken };
