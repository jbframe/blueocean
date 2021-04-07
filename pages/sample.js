import React, { useState, useEffect } from 'react';

const Graham = () => {
  const [session, setSession] = useState(false);

  const handleClick = () => {
    setSession(true);
  }

  // useEffect(() => {

  // }, [session])

  return (
    <div>
      {session ? <div>You're signed in!</div> : <div onClick={handleClick}>Click here to sign in</div>}
    </div>
  );
}

export default Graham;