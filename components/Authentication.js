import { signIn, signOut, useSession } from 'next-auth/client';

// Next-auth implementation
const Authentication =() => {
  const [session, loading] = useSession();
  const userStatus = (status) => {
    if (status) {
      return (
        <div>
          Hello { session.user.name } ({ session.user.email }) <br />
          <button onClick={() => signOut()}> Sign Out </button>
        </div>
        )
    }
    return (
      <div>
        Hello! Please sign in. <br />
        <button onClick={() => signIn()}> Sign In </button>
      </div>
    )
  }

  if (loading) return (<div>Loading...</div>);

  return (
    <div className="authentication">
      {
        session ? userStatus(true) : userStatus(false)
      }
    </div>
  )
}

export default Authentication;
