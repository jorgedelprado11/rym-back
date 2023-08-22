const { User } = require("../DB_connection");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    console.log(req.query);
    if (!email || !password) throw Error("Faltan datos");
    const user = await User.findOne({ where: { email } });
    if (!user) throw Error("Usuario no encontrado");
    if (user.password !== password) throw Error("Contraseña incorrecta");
    res.status(200).json({ access: true });
  } catch (error) {
    console.log(error.message);
    switch (error.message) {
      case "Faltan datos":
        return res.status(400).send(error.message);
      case "Usuario no encontrado":
        return res.status(404).send(error.message);
      case "Contraseña incorrecta":
        return res.status(403).send(error.message);
      default:
        return res.status(500).send(error.message);
    }
  }
};

module.exports = { login };
