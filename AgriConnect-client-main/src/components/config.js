import { 
    ApolloClient,
    InMemoryCache, 
    HttpLink,
    from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(( { graphqlErrors, networkError } ) => {
    if(graphqlErrors) {
        graphqlErrors.map(( { message, path, location } ) => {
            console.log(`error: ${message}`);
        })
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: 'https://app.sudharsands.repl.co/graphql' }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
})

export default client;