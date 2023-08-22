const { Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, species, gender, image } = req.body;
    if (!id || !name || !image || !species || !gender)
      throw Error("Faltan datos");
    await Favorite.findOrCreate({
      where: { id, name, image, species, gender },
    });
    const favorites = await Favorite.findAll();
    res.status(200).json(favorites);
  } catch (error) {
    console.log(error.message)
    error.message === "Faltan datos"
      ? res.status(401).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = { postFav };
