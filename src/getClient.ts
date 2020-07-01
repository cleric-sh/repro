import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';

/**
 * Returns a new, authenticated apollo graphql client.
 */
export const getClient = async (uri: string) => {
  /**
   * First, obtain a bearer token using the dummy account provided.
   */
  // const response = await axios.post<{
  //   token: string;
  // }>('https://app.tibber.com/v4/login.credentials', {
  //   email: 'demo@tibber.com',
  //   password: 'Electric',
  // });

  /**
   * Create an apollo http link.
   */
  const httpLink = createHttpLink({
    // Unfortunately, types are off, so we need to ram this down Apollo's throat.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: fetch as any,
    uri,
  });

  /**
   * Set the authorization header on the client.
   */
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      // authorization: `Bearer ${token}`,
    },
  }));

  /**
   * Create and return the authorized client.
   */
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return client;
};
