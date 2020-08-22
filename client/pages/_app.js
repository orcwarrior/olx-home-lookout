import React from "react";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import withApollo from "../hoc/withApollo";
import "../styles/global.scss";


class OLXHomeLookoutApp extends App {
  static async getInitialProps({Component, ctx}) {
    const componentInitialProps = (Component.getInitialProps) ? await Component.getInitialProps(ctx) : {};
    const finalPageProps = {
      ...componentInitialProps,
      store: ctx.store,
      apolloStore: componentInitialProps || componentInitialProps.store
    };

    const {apolloClient, query} = ctx;
    const {lang} = query;

    return {
      pageProps: finalPageProps,
      store: ctx.store
    };
  }

  render() {
    const {Component, pageProps, apollo, store} = this.props;

    return (<ApolloProvider client={apollo}>
              <Component {...pageProps} store={store}/>
          </ApolloProvider>
    );
  }
}

export default withApollo(OLXHomeLookoutApp);
