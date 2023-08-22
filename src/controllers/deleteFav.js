const { Favorite } = require("../DB_connection");

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteFavorite = await Favorite.findByPk(id);
    await deleteFavorite.destroy();

    const favorites = await Favorite.findAll();

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { deleteFav };
