<<<<<<< HEAD
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
=======
import { getSession, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Image } from "react-bootstrap";
import s from '../styles/Home.module.css';
>>>>>>> 55e4bc1bb11821fa847648e90f387a66240bd069

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  const handleRedirect = (dir) => {
    if (dir === "home") {
      router.push("/home");
    }
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (!session) handleRedirect("signin");
    handleRedirect("home");
  });

<<<<<<< HEAD
  return <div>welcome!</div>;
=======
  return (
    <div>
      <span className={s.logo}><Image src="attendeaze_logo.png.png" roundedCircle /></span>
    </div>
  )
>>>>>>> 55e4bc1bb11821fa847648e90f387a66240bd069
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(),
    },
  };
}
