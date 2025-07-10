import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized: Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdminOrSuperAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role === "admin" || role === "superadmin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied: Admin only" });
};

export const isSuperAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role === "superadmin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied: Superadmin only" });
};

export const isActiveUser = (req, res, next) => {
  const { status } = req.user;

  if (status === "active") {
    return next();
  }

  return res.status(403).json({ message: "Account is deactivated" });
};
