import GiftCard from '../src/components/GiftCard';

const GiftcardPage = ({ giftcard }) => {
  return <GiftCard giftcard={giftcard} />;
};

export default GiftcardPage;

export async function getServerSideProps(context) {
  const { giftcardName } = context.query;

  let giftcard = null;

  try {
    const response = await fetch(
      `http://localhost:3000/api/giftcards?name=${giftcardName}&limit=1`
    );

    giftcard = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (giftcard && giftcard.length > 0) {
    return {
      props: { giftcard: giftcard[0] },
    };
  }

  return {
    notFound: true,
  };
}
