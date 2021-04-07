import React, { useState, useEffect} from 'react';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Icon } from '@material-ui/core';
import $ from 'jquery';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px'
  }
}));

const Login = (props) => {
  const [emailLogin, setEmail] = useState('');
  const [passwordLogin, setPassword] = useState('');
  const [buttonColor, setButtonColor] = useState('green');
  const classes = useStyles();
  const fullNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
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
      //console.log('Email: ', e.target.value);
      setEmail(e.target.value);
      if ( !emailRegex.test(emailLogin) ) {
        $('#emailLogin').css('border', '1px red solid');
      }
      else {
        $('#emailLogin').css('border', '1px green solid');
      }
    } else {
      //console.log('Password: ', e.target.value);
      setPassword(e.target.value);
      if ( !passwordRegex.test(passwordLogin) ) {
        $('#passwordLogin').css('border', '1px red solid');
      }
      else {
        $('#passwordLogin').css('border', '1px green solid');
      }
    }
  }

  function handleClick(e) {
    if ( e.target.id === 'continue') {
      // Execute some code
      // console.log(e.target.innerHTML);
      // console.log("Email:" + emailLogin + " Password: " + passwordLogin);
      if ( emailRegex.test(emailLogin) && passwordRegex.test(passwordLogin)) {
          console.log('Save user information');
          // Make an axios request to post the information
          /*
          axios.post(url, {
            emailLogin: emailLogin,
            passwordLogin: passwordLogin
          }).then((res) => {
            console.log('Response: ', res);
          }) .catch((err) => {
            console.log(err);
          })
          */
      }
    } else if (e.target.id === 'forgot') {
      // Direct user to forgot page
      console.log('forgot');
    } else if ( e.target.id === 'signup' ) {
      // Direct user to sign up form
      console.log('signup');
    } else {
      // User wants to exit the form
      console.log('exit');
    }
  }

  function handleFocus(e) {
    // console.log(e.target.id);
    $(`#${e.target.id}`).css('outline', 'none');
    $(`#${e.target.id}`).css('border', '1px #1E90FF solid');
  }

  function handleBlur(e) {
    $(`#${e.target.id}`).css('border', '1px black solid');
  }

  function handleMouseOver(e) {
    // console.log(e.target);
    if ( e.target.id === 'closeLogin' ) {
      $("#closeLogin").css('color', '#1E90FF');
    } else if ( e.target.id === 'forgot' ) {
      $("#forgot").css('fontWeight', 'bold');
    } else {
      $("#signUpLink").css('fontWeight', 'bold');
    }
  }

  function handleMouseOut(e) {
    // console.log(e.target);
    if ( e.target.id === 'closeLogin' ) {
      $("#closeLogin").css('color', 'black');
    } else if ( e.target.id === 'forgot' ) {
      $("#forgot").css('fontWeight', 'normal');
    } else {
      $("#signUpLink").css('fontWeight', 'normal');
    }
  }
  return (
    <form style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: 'auto', borderRadius: '10px', border: '1px black solid', padding: '10px 20px 20px 20px'}}>
      <div style={{backgroundColor: 'white', textAlign: 'left'}}>
        <CloseIcon id="closeLogin" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} onClick={handleClick}/>
      </div>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontWeight: '20'}}>Enter Login Information</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='email' id='emailLogin' name='emailLogin' placeholder="Email" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='password' id='passwordLogin' name='passwordLogin' placeholder="Password" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button name='continue' onFocus={ handleFocus } onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="continueLogin" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: '#1E90FF', color: 'white'}}>Continue</button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <a id="forgot" onClick={handleClick} onMouseEnter={ handleMouseOver } onMouseLeave={ handleMouseOut } href="" style={{ fontSize: '10px'}}>Forgot password?</a>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <span style={{ padding: '20px 0 40px 0', fontSize: '12px'}}>Dont have an account? <Link href='/signupPage'><a id="signUpLink" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} href="" style={{ textDecoration: 'underline'}}>Sign up</a></Link></span>
          <br />
        </Grid>
      </Grid>
    </form>
  )
}

export default Login;