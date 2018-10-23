const { ApolloServer, gql } = require("apollo-server");
const Swapi = require("./SwapiSource");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Planet {
      name: String,
      rotation_period: String,
      orbital_period: String,
      diameter: String,
      climate: String,
      gravity: String,
      terrain: String,
      surface_water: String,
      population: String,
      residents: [String],
      films: [String],
      created: String,
      edited: String,
      url: String
  }

  type Planets {
    count: Int,
    next: String,
    previous: String,
    results: [Planet]
  }

  type Person {
    birth_year: String,
    eye_color: String,
    films: [String],
    gender: String,
    hair_color: String,
    height: String,
    homeworld: String,
    mass: String,
    name: String,
    skin_color: String,
    created: String,
    edited: String,
    species: [String],
    starships: [String]
    url: String,
    vehicles: [String]
  }

  type Query {
    Planets: Planets
    Planet(id: Int): Planet
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    Planet: async (_source, { id }, { dataSources }) => {
      return dataSources.Swapi.getPlanet(id);
    },
    Planets: async (_source, _, { dataSources }) => {
      return dataSources.Swapi.getPlanets();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      Swapi: new Swapi()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
