import { getSession, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
<<<<<<< HEAD
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "../components/createEvent";

const requests = require("../handlers/requests");s
=======
>>>>>>> 9d3e12b9ed8be76032cc7e788575804f940f76df

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
  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top

=======
>>>>>>> 9d3e12b9ed8be76032cc7e788575804f940f76df
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