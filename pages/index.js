import GiftcardsList from "../src/components/GiftCardsList";

export default function Home({ giftcards }) {
  return <GiftcardsList featuredGiftcards={giftcards} />;
}

export async function getStaticProps() {
  let giftcards = [];

  const hostName = `${process.env.HOST_NAME}:${process.env.PORT || 3000}`;

  try {
    const response = await fetch(`${hostName}/api/giftcards?limit=10`);

    giftcards = await response.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { giftcards },
    revalidate: 10
  };
}
