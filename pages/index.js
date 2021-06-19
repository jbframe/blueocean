import { getSession, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import s from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  const handleRedirect = (dir) => {
    // if (dir === "home") {
    //   router.push("/home");
    // }
    // router.push("/auth/signin");
    router.push("home");
  };

  useEffect(() => {
    // if (!session) handleRedirect("signin");
    // handleRedirect("home");
    router.push("home");
  });

  return (
    <head>
      <meta property='og:title' content='Attend Eaze'/>
    <meta property='og:image' content='https://lh3.googleusercontent.com/pw/ACtC-3e1HrnjOwCSrY7H7-wSfRMmYszwxNioVkzFbb3-JcyZe3cuoJ-1kcFttgYLSLceFqJ-ff9dPtQhc1CpTv2bwcQkhp-NtiaceRJFa5DiXXWejl05N-XIyVLkdh_1X_O6o4ioHp37bBzzoOv6hJrk3COt6Q=w1079-h564-no?authuser=0'/>
    <meta property='og:description' content='Attend Eaze'/>
    <meta property='og:url' content='http://attendeaze.me'/>
    </head>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(),
    },
  };
}
