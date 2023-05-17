// adminMiddleware.js
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

export const withAdminMiddleware = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    // const user = useSelector((state) => state.user);
    const user = useSelector((state) => state.user);
    console.log("middlewar", user);

    useEffect(() => {
      console.log("run");
      setLoading(true);
      if (user) {
        if (user.active && user.user.role === "admin") {
          setLoading(false);
        } else {
          console.log(2);
          localStorage.clear();
          router.push("/");
        }
      } else {
        console.log(1);
        localStorage.clear();
        router.push("/");
      }
    }, [user]);

    if (loading) {
      return (
        <>
          <Flex>
            <Spinner />
            <Text>Please Wait....</Text>
          </Flex>
        </>
      ); // <-- render loading component while loading is true
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
