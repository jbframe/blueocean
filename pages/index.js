import { getSession, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "../components/createEvent";

const requests = require("../handlers/requests");s

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

  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top

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