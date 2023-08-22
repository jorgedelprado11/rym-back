const { User } = require("../DB_connection");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw Error("Faltan datos");
    const newUser = await User.findOrCreate({ where: { email, password } });
    res.status(200).json(newUser);
  } catch (error) {
    error.message === "Faltan datos"
      ? res.status(400).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = { postUser };
