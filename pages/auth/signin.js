import { getCsrfToken, providers, signIn } from 'next-auth/client';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import $ from 'jquery';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.palette.success.light
  },
  fitImg : {
    width: '100%',
    height: '800px'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    border: '2px black solid',
    width: '50%'
  },
}));

export default function SignIn({ providers, csrfToken }) {
  const [emailLogin, setEmail] = useState('');
  const [passwordLogin, setPassword] = useState('');
  const classes = useStyles();
  const { google } = providers;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Testing193!

  function handleMouseEnter(e) {
    if ( e.target.name === 'continue') {
      $(e.target).css('border', '1px black solid');
      $(e.target).css('boxShadow', '2px 2px black');
    }

    if ( e.target.name === 'googleButton' ) {
      $(e.target).css('border', '1px #1E90FF solid');
      $(e.target).css('boxShadow', '2px 2px #1E90FF');
    }
  }

  function handleMouseLeave(e) {
    if ( e.target.name === 'continue') {
      $(e.target).css('border', '1px white solid');
      $(e.target).css('boxShadow', '0px 0px white');
    }

    if ( e.target.name === 'googleButton' ) {
      $(e.target).css('border', '1px black solid');
      $(e.target).css('boxShadow', '0px 0px white');
    }
  }

  function handleChange(e) {
    if ( e.target.name === 'emailLogin' ) {
      setEmail(e.target.value);
      if ( !emailRegex.test(emailLogin) ) {
        $('#emailLogin').css('border', '1px red solid');
      }
      else {
        $('#emailLogin').css('border', '1px green solid');
      }
    } else {
      setPassword(e.target.value);
      if ( !passwordRegex.test(passwordLogin) ) {
        $('#passwordLogin').css('border', '1px red solid');
      }
      else {
        $('#passwordLogin').css('border', '1px green solid');
      }
    }
  }

  function handleFocus(e) {
    $(`#${e.target.id}`).css('outline', 'none');
    $(`#${e.target.id}`).css('border', '1px blue solid');
  }

  function handleBlur(e) {
    $(`#${e.target.id}`).css('border', '1px black solid');
  }

  function handleMouseOver(e) {
    if ( e.target.id === 'closeLogin' ) {
      $("#closeLogin").css('color', '#1E90FF');
    } else if ( e.target.id === 'forgot' ) {
      $("#forgot").css('fontWeight', 'bold');
    } else {
      $("#signUpLink").css('fontWeight', 'bold');
    }
  }

  function handleMouseOut(e) {
    if ( e.target.id === 'closeLogin' ) {
      $("#closeLogin").css('color', 'black');
    } else if ( e.target.id === 'forgot' ) {
      $("#forgot").css('fontWeight', 'normal');
    } else {
      $("#signUpLink").css('fontWeight', 'normal');
    }
  }

  const [session] = useSession();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const handleWindowResize = ()=>{
    if (!isMobile && window.innerWidth < 700) {
      setIsMobile(true)
    }
    if (isMobile && window.innerWidth > 700) {
      setIsMobile(false)
    }

  }

  useEffect(() => {
    if(session) {
      router.push('/home')
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
  })



  return (
    <Grid style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: '30vh auto', borderRadius: '10px', border: '1px black solid', padding: '20px 20px 20px 20px'}}>
      <button name='signInWithGoogle' onFocus={ handleFocus } onClick={() => signIn(google.id)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="signInWithGoogle" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: '#1E90FF', color: 'white'}}>Sign in with {google.name}</button>
    </Grid>
    //version with magic link UI (not implemented)
    // <Grid style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: '30vh auto', borderRadius: '10px', border: '1px black solid', padding: '10px 20px 20px 20px'}}>
    //   <Grid container spacing={2} className={classes.grid}>
    //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //       <h1 style={{ fontWeight: '20'}}>Enter Login Information</h1>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //       <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='text' id='emailLogin' name='emailLogin' placeholder="Email" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //       <button name='magicLink' onFocus={ handleFocus } onClick={() => signIn('email', { email: emailLogin })} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="magicLink" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: '#1E90FF', color: 'white'}}>Send Magic Link</button>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //       <button name='signInWithGoogle' onFocus={ handleFocus } onClick={() => signIn(google.id)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="signInWithGoogle" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: '#1E90FF', color: 'white'}}>Sign in with {google.name}</button>
    //     </Grid>
    //   </Grid>
    // </Grid>
  )
}

export async function getServerSideProps(context) {
  const Providers = await providers();
  return {
    props: {
      providers: Providers,
      csrfToken: await getCsrfToken(context),
    }
  }
}