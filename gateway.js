const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001/graphql", namespace: "Accounts" },
    { name: "reviews", url: "http://localhost:4002/graphql", namespace: "Reviews" },
    { name: "products", url: "http://localhost:4003/graphql", namespace: "Products" },
    { name: "inventory", url: "http://localhost:4004/graphql", namespace: "Inventory" }
  ]
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
