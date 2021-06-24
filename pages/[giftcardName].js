import GiftCard from "../src/components/GiftCard";

const GiftcardPage = ({ giftcard }) => {
  console.log(process.env.HOST_NAME);
  return <GiftCard giftcard={giftcard} />;
};

export default GiftcardPage;

export async function getServerSideProps(context) {
  const { giftcardName } = context.query;

  let giftcard = null;

  const hostName = `https://yoyogifts.vercel.app`;

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
