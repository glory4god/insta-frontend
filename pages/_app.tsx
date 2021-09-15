import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { Provider } from 'react-redux';
import Head from 'components/common/Head';
import Layout from 'components/common/Layout';
import { store } from 'lib/redux/store';
import { useRouter } from 'next/dist/client/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const pages = useRouter()
  return (
    <>
      <Head />
      <Provider store={store}>
        {pages.asPath === '/login' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </>
  );
}
