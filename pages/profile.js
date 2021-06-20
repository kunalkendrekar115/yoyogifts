import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";

import Profile from "../src/components/Profile";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/profile`);
      setLoading(false);

      const user = await response.json();

      if (response.status === 403) {
        router.replace("/login");
      } else {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <Box padding="10">
      {loading && <Heading>Loading...</Heading>}
      {user && <Profile user={user} />}
    </Box>
  );
};

export default ProfilePage;
