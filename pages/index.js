import Head from "next/head";
import Hero from "@/Components/Hero/Hero";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   console.log("hi homePage");
  // }, []);

  return (
    <>
      <Head>
        <title>HospitalHandTools | Shop the Latest Surgical Instruments</title>
        <meta
          name="description"
          content="High-Quality Surgical Instruments for Healthcare Professionals: HospitalHandTools provides a variety of high-quality surgical equipment for healthcare professionals. Our tools, which range from scalpels to forceps, are made with precision, durability, and safety in mind."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta
          name="keywords"
          content="
          Plastic Surgery Instruments | Liposuction Cannula | Blepharoplasty Instruments | Rhinoplasty Instruments | ENT Instruments | Breast Surgery Instruments | Abdominoplasty Instruments"
        />
      </Head>

      <Hero />
    </>
  );
}
