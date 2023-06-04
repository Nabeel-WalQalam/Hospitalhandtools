import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import "../styles/globals.css";
import {
  ChakraProvider,
  Flex,
  ColorModeProvider,
  Spinner,
  Text,
  Box,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { setUser } from "@/store/userSlice";
import secureLocalStorage from "react-secure-storage";
import { Lato } from "@next/font/google";
import { store } from "../store";
import { Provider } from "react-redux";
import { getUserData } from "../store";
import Message from "@/Components/Contact/Message";
import Index from "@/Components/SubNavbar/Index";
import TawkTo from "@/Components/Chat/Tawk";
import Head from "next/head";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
export default function App({ Component, pageProps }) {
  const { colorMode } = useColorMode();
  // console.log("color", colorMode);
  const [Loading, setLoading] = useState(true);
  const { isOpen, onToggle } = useDisclosure();
  // const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState();
  const [cart, setCart] = useState({});
  const [subTotal, setSubtotal] = useState();
  const [progress, setProgress] = useState(0);
  const [admin, setadmin] = useState("");
  const { user, active } = store.getState();

  const router = useRouter();

  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  // useEffect(() => {
  //   if (user.user) {
  //     if (user.user.role === "admin" && user.active) {
  //       router.push("/admin");
  //     }
  //   }
  // }, [user]);

  // console.log(router.pathname);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      const verifyUser = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/verifytoken`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          }
        );
        const data = await response.json();
        // console.log(rsult);
        if (data.success) {
          store.dispatch(setUser(data.user));
          // console.log(data);
          localStorage.setItem("token", data.token);
          setLoading(false);
        } else {
          store.dispatch(setUser(null));
          localStorage.clear();
          setLoading(false);
        }

        // setuser("rsult.user.displayName");
      };
      verifyUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
  }, [router.query]);

  useEffect(() => {
    console.log("render only once");
  }, []);

  return Loading ? (
    <>
      <Head>
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        border={"1px"}
        height={"100vh"}
      >
        <Box>
          <Spinner
            color="#153A5B"
            size={"xl"}
            width={"100px"}
            height={"100px"}
            thickness="5px"
          />
        </Box>
        <Text
          my={"1rem"}
          fontWeight={"bold"}
          color={"#153A5B"}
          fontSize={"2rem"}
        >
          Hospital Hand Tool
        </Text>
      </Flex>
    </>
  ) : (
    // <main className={lato.className}>
    <Provider store={store}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: true,
        }}
      >
        <ChakraProvider>
          {router.pathname.startsWith("/haniya") ? (
            user.user && user.user.role === "admin" && user.active ? (
              <>
                <LoadingBar
                  color="#153A5B"
                  height="5px"
                  waitingTime={350}
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                />
                <Flex>
                  <Sidebar />
                  <Component {...pageProps} />
                </Flex>
              </>
            ) : (
              <>
                <LoadingBar
                  color="#153A5B"
                  height="5px"
                  waitingTime={350}
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                />
                <Flex width={"100%"}>
                  {/* <Sidebar /> */}
                  <Component {...pageProps} />
                </Flex>
              </>
            )
          ) : (
            <>
              <LoadingBar
                color="#153A5B"
                height="5px"
                waitingTime={350}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
              />
              <Message />
              {<Navbar isOpen={isOpen} onToggle={onToggle} />}
              <Index />
              <Component {...pageProps} />
              <Box display={["none", "none", "block"]}>
                <TawkTo />
              </Box>

              <Footer />
            </>
          )}
        </ChakraProvider>
      </ColorModeProvider>
    </Provider>
    // </main>
  );
}
