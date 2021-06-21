import Head from "next/head";

function SEOTags(props) {
  return (
    <Head>
      <title>YoYO Gifts</title>
      <meta property="og:title" content="YoYO Gifts" key="title" />
      <meta
        property="og:description"
        content="Purchase & Send Giftcards to email"
        key="title"
      />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default SEOTags;
