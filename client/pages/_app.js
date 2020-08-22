import React from "react";
import ReactDom from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import withApollo from "../hoc/withApollo";
import * as Sentry from "@sentry/browser";
import { SHARED_SENTRY_DSN } from "@config";
import { RecoilRoot } from "recoil";
import { Box, grommet, Grommet, Main } from 'grommet';
import "../styles/global.scss";

import { dark } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';


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
