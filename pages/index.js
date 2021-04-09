import { getSession, useSession } from "next-auth/client";
<<<<<<< HEAD
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
=======
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "../components/createEvent";

const requests = require("../handlers/requests");
>>>>>>> e76b001917e1af83ab5ae74e86d1c119228d6fe6

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  const handleRedirect = (dir) => {
    if (dir === 'home') {
      router.push('/home')
    }
    router.push('/auth/signin')
  }

  useEffect(() => {
    if (!session) handleRedirect('signin')
    handleRedirect('home')
  })

<<<<<<< HEAD
=======
  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top

>>>>>>> e76b001917e1af83ab5ae74e86d1c119228d6fe6
  return (
    <div>
      welcome!
    </div>
  )
}

export async function getServerSideProps (context) {
  return {
    props: {
      session: await getSession()
    },
  }
}``