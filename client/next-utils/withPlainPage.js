import React from "react";

const withPlainPage = (Component) => (props) => {
  const {pageProps, store} = props;

  return <Component {...pageProps} store={store}/>;
}

withPlainPage.getInitialProps = async ({Component, ctx}) => {
  const componentInitialProps = (Component.getInitialProps) ? await Component.getInitialProps(ctx) : {};
  const finalPageProps = {
    ...componentInitialProps,
    store: ctx.store,
    apolloStore: componentInitialProps || componentInitialProps.store
  };

  return {
    pageProps: finalPageProps,
    store: ctx.store
  };
}



export { withPlainPage }
