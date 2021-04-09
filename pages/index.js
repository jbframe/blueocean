import { getSession, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

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
}