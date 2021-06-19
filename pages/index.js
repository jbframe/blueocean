import { getSession, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import s from "../styles/Home.module.css";
import { NextSeo } from 'next-seo';

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
       <NextSeo
        title="Attend Eaze"
        description="Attend Eaze"
        openGraph={{
          url: 'http://www.attendeaze.me',
          title: 'Make John a ☕️',
          description: 'MAKE John a coffee via the magic of the internet!',
          images: [
            {
              url: 'https://lh3.googleusercontent.com/pw/ACtC-3e1HrnjOwCSrY7H7-wSfRMmYszwxNioVkzFbb3-JcyZe3cuoJ-1kcFttgYLSLceFqJ-ff9dPtQhc1CpTv2bwcQkhp-NtiaceRJFa5DiXXWejl05N-XIyVLkdh_1X_O6o4ioHp37bBzzoOv6hJrk3COt6Q=w1079-h564-no?authuser=0',
              width: 1200,
              height: 627,
              alt: 'Attend Eaze',
            }
          ],
          site_name: 'Attend Eaze',
        }}
      />
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
