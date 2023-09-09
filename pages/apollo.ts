import { ApolloClient, InMemoryCache } from "@apollo/client";
// import COUNTRY_QUERY from "./countryquery";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

export default client;