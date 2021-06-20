import { Box, Flex, Text, Heading, HStack, Stack } from "@chakra-ui/layout";
import { faEnvelope, faGift, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const OrdersTable = ({ orders }) => (
  <Box>
    {orders.map((order) => (
      <Flex
        w="100%"
        direction="column"
        marginTop="5"
        boxShadow="md"
        padding="5"
      >
        <Stack spacing="5">
          <Flex justify="space-between">
            <Heading size="sm">{`OrderDate: ${moment(order.orderDate).format(
              "DD-MMM-YYYY"
            )}`}</Heading>
            <Heading size="sm">
              Total Amount: &#8377; {order.totalAmount}
            </Heading>
          </Flex>
          <Box>
            <Heading marginBottom="4" size="sm">
              Order Summary:
            </Heading>

            {order.cart.map((cart) => (
              <Flex marginTop="2">
                <HStack spacing="10">
                  <Flex align="center">
                    <FontAwesomeIcon style={{ marginRight: 8 }} icon={faGift} />
                    <Text>{cart.name}</Text>
                  </Flex>

                  <Text>&#8377; {cart.denomination}</Text>

                  <Flex align="center">
                    <FontAwesomeIcon style={{ marginRight: 8 }} icon={faUser} />
                    <Text>{cart.recipientName}</Text>
                  </Flex>

                  <Flex align="center">
                    <FontAwesomeIcon
                      style={{ marginRight: 8 }}
                      icon={faEnvelope}
                    />
                    <Text> {cart.recipientEmail}</Text>
                  </Flex>
                </HStack>
              </Flex>
            ))}
          </Box>
        </Stack>
      </Flex>
    ))}
  </Box>
);

export default OrdersTable;
