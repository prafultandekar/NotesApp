const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("🔍 Request Headers:", req.headers); // ✅ Yeh line tujhe sab headers dikhayegi

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Token not found or format invalid"); // Optional log
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];
  console.log("✅ Token received:", token); // ✅ Yeh line token show karegi

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    console.log("✅ Decoded Token:", decoded); // ✅ Yeh line userId ya aur data dikhayegi

    next();
  } catch (err) {
    console.log("❌ Invalid token error:", err.message); // ✅ Error ka reason
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
