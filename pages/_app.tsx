import React from 'react';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { Provider } from 'react-redux';
import Head from 'components/common/Head';
import Layout from 'components/common/Layout';
import { store } from 'lib/redux/store';
import { useRouter } from 'next/dist/client/router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
