import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { Provider } from 'react-redux';
import Head from 'components/common/Head';
import Layout from 'components/common/Layout';
import { store } from 'lib/redux/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
