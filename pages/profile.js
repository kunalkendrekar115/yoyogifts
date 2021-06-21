import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";
import { signOut } from "next-auth/client";

import Profile from "../src/components/Profile";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingSignout, setLoadongSignOut] = useState(false);

  const router = useRouter();

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/profile`);
      setLoading(false);

      const user = await response.json();

      if (response.status === 403) {
        router.replace("/login?redirect=profile");
      } else {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const handleSignOut = async () => {
    setLoadongSignOut(true);
    await signOut({ redirect: false });
    setLoadongSignOut(false);
    router.replace("/");
  };

  return (
    <Box padding="10">
      {loading && <Heading>Loading...</Heading>}
      {user && (
        <Profile
          user={user}
          loadingSignout={loadingSignout}
          signOut={handleSignOut}
        />
      )}
    </Box>
  );
};

export default ProfilePage;
