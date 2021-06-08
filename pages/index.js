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
    <div>
      <span className={s.logo}>
        <Image src="attendeaze_logo.png.png" roundedCircle />
      </span>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(),
    },
  };
}
