import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  faEnvelope,
  faHistory,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdersTable from "./OrdersTable";

const Profile = ({ user, signOut, loadingSignout }) => {
  const router = useRouter();

  return (
    <Flex direction="column" align="center">
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Flex align="center" w="100%">
            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faUser} />
            <Heading size="lg">{`${user.firstName} ${user.lastName}`}</Heading>

            <Button ml="10" onClick={signOut} isLoading={loadingSignout}>
              Signout
            </Button>
          </Flex>

          <Flex align="center">
            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faEnvelope} />
            <Heading size="sm">{user.emailId}</Heading>
          </Flex>
        </Stack>

        <Flex align="center" justify="center" bg="lightgray">
          <FontAwesomeIcon style={{ marginRight: 10 }} icon={faHistory} />
          <Heading size="md">Order History</Heading>
        </Flex>

        {user.orders && user.orders.length > 0 ? (
          <OrdersTable orders={user.orders} />
        ) : (
          <Heading> No Orders Found</Heading>
        )}
      </Stack>
    </Flex>
  );
};

export default Profile;
