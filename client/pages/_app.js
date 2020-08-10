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

const customizedTheme = deepMerge(dark, {
  global: {
    colors: {
      brand: "#FEE715"
    },
  },
  button: {
    border: {
      radius: "2px",
    },
    size: {
      small: {border: {radius: "2px"}},
      medium: {border: {radius: "3px"}},
      large: {border: {radius: "4px"}},
    }
  }
})

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

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount() {
    return; // DK: Temporarly remove react-axe

    if (process.env.NODE_ENV !== "production") {
      const axe = require("react-axe");
      axe(React, ReactDom, 1000);
    }
  }

  render() {
    const {Component, pageProps, apollo, store} = this.props;

    return (<RecoilRoot>
          <ApolloProvider client={apollo}>
            <Grommet theme={customizedTheme} full={true}>
              <Box fill="vertical" justify="center">
                  <Component {...pageProps} store={store}/>
              </Box>
            </Grommet>
          </ApolloProvider>
        </RecoilRoot>
    );
  }
}

export default withApollo(OLXHomeLookoutApp);
