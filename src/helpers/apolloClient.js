import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apolloClient;
