import Head from 'next/head';

export default function Meta(props) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{props.title}</title>

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
