import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const header = req.headers(["authorization"]);

  if (!header) return res.status(401).json({ error: "No Autorizado" });

  //obtner el token cuando haya un espacio
  const token = header.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token Invalido" });

    req.user = user;
    next();
  });
};
