import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { GRAPHQL } from "@config";

console.log(`GRAPHQL.URL: `, GRAPHQL.URL);
console.log(`process.env.SERVER_PARSE_APP_ID: `, process.env.SERVER_PARSE_APP_ID);
const httpLink = createHttpLink({uri: GRAPHQL.URL, credentials: "include"});
const parseServerLink = setContext((_, {headers}) => {
    return { headers: {...headers, ["x-hasura-access-key"]: process.env.HASURA_GRAPHQL_ADMIN_SECRET}};
});


const apolloClientConfig = (initialState) => ({
    link: parseServerLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
});

export default withApollo(({ctx, headers, initialState}) => new ApolloClient(apolloClientConfig(initialState)));
