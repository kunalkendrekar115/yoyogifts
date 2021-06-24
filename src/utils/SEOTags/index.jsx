import Head from "next/head";

function SEOTags({ giftcard }) {
  const title = giftcard?.name || "YoYO Gifts";
  const description = giftcard?.description || "Purchase & Send Giftcards to email";
  const image = giftcard?.image ? `assets/${giftcard.image}.png` : "favicon.ico";

  const imageURL = `https://yoyogifts.vercel.app/${image}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="image" content={imageURL}></meta>
      <meta property="description" content={description} key="title" />

      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={description} key="title" />
      <meta property="og:image" content={imageURL}></meta>

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default SEOTags;
