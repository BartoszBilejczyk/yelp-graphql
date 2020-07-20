import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import { typeDefs } from '@/graphql/typeDefs';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_API_BASE_URL
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.VUE_APP_YELP_API_KEY}`,
      'Accept-Language': `en_US`
    }
  }
});

// Cache implementation
const cache = new InMemoryCache()

cache.writeData({
  data: {
    search: {
      business: [],
      __typename: 'Search'
    },
    activeCategory: {
      __typename: 'ActiveCategory'
    },
    loading: false,
    activeMarker: null,
    center: {
      lat: 52.237022,
      lng: 21.050440,
      __typename: 'MapCenter'
    },
    zoom: 12,
    categories: []
  },
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers: {}
})
