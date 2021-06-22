import GiftcardsList from "../src/components/GiftCardsList";

export default function Home({ giftcards }) {
  return <GiftcardsList featuredGiftcards={giftcards} />;
}

export async function getStaticProps() {
  let giftcards = [];
  try {
    const response = await fetch("http://localhost:3000/api/giftcards?limit=10");

    giftcards = await response.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { giftcards },
    revalidate: 10
  };
}
