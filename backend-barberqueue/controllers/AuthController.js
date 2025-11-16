import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

class AuthController {
  async register(req, res) {
    try {
      console.log("Datos recibidos en registro:", req.body);
      const { name, email, password } = req.body;
      //verificar si existe el usuario

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "El Usuario ya existe" });
      }

      const newUser = await User.create({
        name,
        email,
        password,
        roleId: 3,
      });

      return res
        .status(201)
        .json({ message: "usuario creado con exito", user: newUser });
    } catch (error) {
      console.error("Error en el registro:", error);
      res
        .status(500)
        .json({ message: "Error en el servidor", error: error.message });
    }
  }

  async login(req, res) {
    console.log("datos recibidos del login", req.body);
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Contrasena incorrecta" });

    //crear el token con roleId como número
    const token = jwt.sign(
      { id: user.id, roleId: Number(user.roleId) },
      SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "Login Exitoso", user, token });
  }
}

export default new AuthController();
