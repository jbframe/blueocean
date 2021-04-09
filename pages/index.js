import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  const handleRedirect = (dir) => {
    if (dir === "home") {
      router.push("/home");
    }
<<<<<<< HEAD
    router.push("/auth/signin");
  };
=======
    // router.push('/auth/signin')
  }
>>>>>>> 2adc0edac32a971afc571556415a5c6babf9dfd4

  useEffect(() => {
    if (!session) handleRedirect("signin");
    handleRedirect("home");
  });

  return <div>welcome!</div>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(),
    },
  };
}
