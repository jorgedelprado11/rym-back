const app = require("../src/app");
const session = require("supertest");
const request = session(app);

const character = {
  id: 999,
  name: "pochoide",
  species: "human",
  gender: "male",
  status: "alive",
  origin: {
    name: "Earth (C-137)",
  },
  image: "image.jpg",
};

describe("test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const response = await request.get("/rickandmorty/character/1");

      expect(response.statusCode).toBe(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await request.get("/rickandmorty/character/1");

      for (const prop in character) {
        expect(response.body).toHaveProperty(prop);
      }
    });
    it("Si hay un error responde con status 500", async () => {
      const response = await request.get("/rickandmorty/character/1123f");
      expect(response.statusCode).toBe(500);
    });
  });
});

describe("GET /rickandmorty/login", () => {
  const access = { access: true };

  it("Responde con un objeto con la propiedad acces en true si la información del usuario es válida", async () => {
    const response = await request.get(
      "/rickandmorty/login?email=jorge@gmail.com&password=1234Aa_"
    );
    expect(response.body).toEqual(access);
  });

  it("Responde con un objeto con la propiedad acces en false si la información del usuario no es válida", async () => {
    const response = await request.get(
      "/rickandmorty/login?email=pochoide@gmail.com&password=1234Aa_"
    );
    access.access = false;
    expect(response.body).toEqual(access);
  });

  describe("POST /rickandmorty/fav", () => {
    it("Debe guardar el personaje en favoritos", async () => {
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body).toContainEqual(character);
    });

    it("Debe agregar personajes a favoritos eliminar los existentes", async () => {
      character.id = 988;
      character.name = "ilpocho";
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body.length).toBe(2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Si el ID solicitado no existe, debe retornar un array con todos los favs", async () => {
      const response = await request.delete("/rickandmorty/fav/21233sd");
      expect(response.body.length).toBe(2);
    });

    it("Si el ID solicitado existe, debe eliminar de favs", async () => {
      const response = await request.delete("/rickandmorty/fav/999");
      expect(response.body.length).toBe(1);
    });
  });
});
