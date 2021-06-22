import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useSession } from "next-auth/client";
import moment from "moment";
import { useRouter } from "next/router";

const GiftcardReviews = ({ giftcard }) => {
  const [session] = useSession();
  const [reviewText, setReviewText] = useState();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (giftcard.reviews) setReviews(giftcard.reviews);
  }, [giftcard.reviews]);

  const postReview = async () => {
    const review = { reviewText, name: giftcard.name };

    try {
      setLoading(true);
      const response = await fetch("/api/giftcards/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      });

      if (response.status === 200) {
        const addedReview = await response.json();
        setReviewText("");
        setReviews([{ ...addedReview }, ...reviews]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box flex={0.5}>
      <Heading size="md">{`Reviews for ${giftcard.brand}`}</Heading>
      <Flex
        align="center"
        justify="center"
        p="5"
        mt="4"
        direction="column"
        bg="white"
        boxShadow="md"
      >
        {!session ? (
          <>
            <Heading size="md">Login to post the review </Heading>
            <Button
              w="100px"
              marginTop="3"
              onClick={() => router.push(`/login?redirect=${giftcard.name}`)}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Input
              w="md"
              h="60px"
              value={reviewText}
              onChange={({ target: { value } }) => setReviewText(value)}
              placeholder="Write review"
              borderColor="grey"
            />
            <Button
              w="100px"
              marginTop="3"
              onClick={() => postReview(reviewText)}
              isDisabled={!reviewText}
              isLoading={loading}
            >
              Add Review
            </Button>
          </>
        )}
      </Flex>

      <Heading size="md" mt="5">
        {reviews.length === 0 ? "No Reviews for this brand" : "Featured Reviews"}
      </Heading>

      {reviews.map((review, index) => (
        <Flex
          key={`reviewKey-${index}`}
          w="100%"
          direction="column"
          marginTop="5"
          bg="white"
          boxShadow="md"
          padding="5"
        >
          <Stack spacing="5">
            <Flex justify="space-between">
              <Heading size="xs">{review.name}</Heading>
              <Heading size="xs">{`Review Date: ${moment(review.reviewDate).format(
                "DD-MMM-YYYY"
              )}`}</Heading>
            </Flex>

            <Text>{review.reviewText}</Text>
          </Stack>
        </Flex>
      ))}
    </Box>
  );
};

export default GiftcardReviews;
