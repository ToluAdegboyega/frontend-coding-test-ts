import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_RICK_AND_MORTY_URL,
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
})

export default apolloClient
