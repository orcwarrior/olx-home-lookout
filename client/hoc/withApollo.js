import withApollo from "next-with-apollo";
import {ApolloClient, createHttpLink, NormalizedCacheObject} from "@apollo/client";
import {GRAPHQL} from "@config";

console.log(`GRAPHQL.URL: `, GRAPHQL.URL);
console.log(`process.env.SERVER_PARSE_APP_ID: `, process.env.SERVER_PARSE_APP_ID);
const httpLink = createHttpLink({
    uri: GRAPHQL.URL, credentials: "include",
    headers: {
        "x-hasura-access-key": process.env.HASURA_GRAPHQL_ADMIN_SECRET
    }
});
// const hasuraServerLink = setContext((_, {headers}) => {
//     return {headers: {...headers, "x-hasura-access-key": process.env.HASURA_GRAPHQL_ADMIN_SECRET}};
// });


const apolloClientConfig = (initialState) => ({
    link: httpLink,
    cache: new NormalizedCacheObject().restore(initialState || {})
});

export default withApollo(({ctx, headers, initialState}) => new ApolloClient(apolloClientConfig(initialState)));
