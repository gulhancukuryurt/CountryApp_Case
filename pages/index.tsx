import Image from 'next/image'
import { Inter } from 'next/font/google'
import TextFilter from '../components/CountryList'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ApolloProvider client={client}>

        <TextFilter />
      </ApolloProvider>

    </>
  )
}
