import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import {
  ChakraProvider,
  Flex,
  ColorModeProvider,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect, Fragment } from "react";
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
// import TawkTo from "@/Components/Chat/Tawk";
import Head from "next/head";
import Script from "next/script";
import { Loader } from "@/Components/Spinner/Loader";
import { SubFooter } from "@/Components/Footer/SubFooter";
import { Analytics } from "@vercel/analytics/react";

// const TawkTo = dynamic(() => import("@/Components/Chat/Tawk"), {
//   ssr: false,
// });

// const lato = Lato({
//   subsets: ["latin"],
//   weight: ["400", "700", "900"],
// });
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

  useEffect(() => {
    console.log("run _app.js");
  }, []);

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
    const handleRouteChangeComplete = () => {
      setProgress(100);
    };

    const handleRouteChangeStart = () => {
      setProgress(40);
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  return Loading ? (
    <>
      <Loader />
    </>
  ) : (
    // <main className={lato.className}>

    <Provider store={store}>
      <Head>
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></Script>
      </Head>
      <ColorModeProvider
      // options={{
      //   initialColorMode: "light",
      //   useSystemColorMode: true,
      // }}
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
            <Fragment>
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
              <Analytics />
              {/* <Box display={["none", "none", "block"]}>
                <TawkTo />
              </Box> */}
              <SubFooter />
              <Footer />
            </Fragment>
          )}
        </ChakraProvider>
      </ColorModeProvider>
    </Provider>
    // </main>
  );
}
