import {Grommet} from "grommet";
import {RecoilRoot} from "recoil";
import React from "react";
import {deepMerge} from "grommet/utils";
import {dark} from "grommet/themes";
import ReactDom from "react-dom";
import * as Sentry from "@sentry/browser";

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
});


const _withPage = (Component) => (props) => {
    console.log(`_withPage.props: `, props);
    const {pageProps, store} = props;
    return (<RecoilRoot>
        <Grommet theme={customizedTheme} full={true}>
            <Component {...pageProps} store={store}/>
        </Grommet>
    </RecoilRoot>);
};
_withPage.getInitialProps = async ({Component, ctx}) => {
    const componentInitialProps = (Component.getInitialProps) ? await Component.getInitialProps(ctx) : {};
    const finalPageProps = {
        ...componentInitialProps,
        store: ctx.store
    };

    return {
        pageProps: finalPageProps,
        store: ctx.store
    };
};

_withPage.componentDidMount = () => {
    console.log(`withPage.componentDidMount...`);
    return; // DK: Temporarly remove react-axe

    // if (process.env.NODE_ENV !== "production") {
    //   const axe = require("react-axe");
    //   axe(React, ReactDom, 1000);
    // }
};

_withPage.componentDidCatch = (error, errorInfo) => {
    Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
            scope.setExtra(key, errorInfo[key]);
        });

        Sentry.captureException(error);
    });

    // super.componentDidCatch(error, errorInfo);
};

const withPage = (_withPage);

export {withPage};
