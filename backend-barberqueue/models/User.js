import pool from "../config/db.js";
import bcrypt from "bcrypt";

class User {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return rows[0];
  }

  //crear el usuario en la base de datos
  async create({ name, email, password, roleId }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users(name, email, password, roleId) VALUES(?,?,?,?) ",
      [name, email, hashedPassword, roleId]
    );

    return { id: result.insertId, name, email, roleId };
  }

}

export default new User();
