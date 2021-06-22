import GiftCard from "../src/components/GiftCard";

const GiftcardPage = ({ giftcard }) => {
  return <GiftCard giftcard={giftcard} />;
};

export default GiftcardPage;

export async function getServerSideProps(context) {
  const { giftcardName } = context.query;

  let giftcard = null;

  const hostName = `${process.env.HOST_NAME}:${process.env.PORT || 3000}`;

  try {
    const response = await fetch(`${hostName}/api/giftcards?name=${giftcardName}&limit=10`);

    giftcard = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (giftcard && giftcard.length > 0) {
    return {
      props: { giftcard: giftcard[0] }
    };
  }

  return {
    notFound: true
  };
}
