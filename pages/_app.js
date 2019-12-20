import React from 'react'
import App from 'next/app'
import { Store, fetchGeneralInfo } from '../store'
import { Provider } from 'mobx-react'

import '../style/index.scss'

class MyApp extends App {
    state = {
        store: new Store(),
    }

    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    static async getInitialProps(appContext) {
      // calls page's `getInitialProps` and fills `appProps.pageProps`
      const appProps = await App.getInitialProps(appContext);

      let generalInfo
      try {
          generalInfo = await fetchGeneralInfo()
      } catch (e) {
          generalInfo = {}
      }

      return { ...appProps, generalInfo }
    }

    static getDerivedStateFromProps(props, state) {
        state.store.setGeneralInfo(props.generalInfo)
        return state
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <Provider store={this.state.store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default MyApp
