import React, { useState, useEffect } from 'react';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Icon } from '@material-ui/core';
import $ from 'jquery';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  grid: {
    width: '100%',
    margin: '0px'
  }
}));

const SignUp = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
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
    if ( e.target.name === 'fullName' ) {
      //console.log('Fullname: ', e.target.value);
      setFullName(e.target.value);
      if ( !fullNameRegex.test(fullName) ) {
        $('#fullName').css('border', '1px red solid');
      }
      else {
        $('#fullName').css('border', '1px green solid');
      }
    } else if ( e.target.name === 'email' ) {
      //console.log('Email: ', e.target.value);
      setEmail(e.target.value);
      if ( !emailRegex.test(email) ) {
        $('#email').css('border', '1px red solid');
      }
      else {
        $('#email').css('border', '1px green solid');
      }
    } else if ( e.target.name === 'password') {
      //console.log('Password: ', e.target.value);
      setPassword(e.target.value);
      if ( !passwordRegex.test(password) ) {
        $('#password').css('border', '1px red solid');
      }
      else {
        $('#password').css('border', '1px green solid');
      }
    } else {
      //console.log('Confirm Password: ', e.target.value);
      setConfirm(e.target.value);
      if ( !passwordRegex.test(password) ) {
        $('#confirmPassword').css('border', '1px red solid');
      }
      else {
        $('#confirmPassword').css('border', '1px green solid');
      }
    }
  }

  function handleClick(e) {
    if ( e.target.id === 'continue') {
      // Execute some code
      // console.log(e.target.innerHTML);
      // console.log('Fullname: ' + fullName + " Email:" + email + " Password: " + password);
      // console.log('Fullname: ' + fullNameRegex.test(fullName) + " Email:" + emailRegex.test(email) + " Password: " + passwordRegex.test(password));
      if ( fullNameRegex.test(fullName) && emailRegex.test(email) && passwordRegex.test(password) && passwordRegex.test(confirmPassword) && password === confirmPassword ) {
          console.log('Save user information');
          // Make an axios request to Express server and save
          // information to database

          /*
          axios.post(url, {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
          }).then((res) => {
            console.log('Response: ', res);
          }) .catch((err) => {
            console.log(err);
          })
          */
      }
    } else if ( e.target.id === 'googleButton' ) {
      // User has clicked the google login option
      console.log('Google Login');
    } else if (e.target.id === 'logIn' ) {
      // Show the user the login form
      console.log('Login form');
    } else {
      console.log('User wants to exit the signup form');
    }
  }

  function handleFocus(e) {
    //console.log(e.target.id);
    $(`#${e.target.id}`).css('outline', 'none');
    $(`#${e.target.id}`).css('border', '1px #1E90FF solid');
  }

  function handleBlur(e) {
    $(`#${e.target.id}`).css('border', '1px black solid');
  }

  function handleMouseOver(e) {
    //console.log(e.target);
    if ( e.target.id === 'loginLink' ) {
      $("#loginLink").css('fontWeight', 'bold');
    } else {
      $("#closeSignUp").css('color', '#1E90FF');
    }
  }

  function handleMouseOut(e) {
    // console.log(e.target);
    if ( e.target.id === 'loginLink' ) {
      $("#loginLink").css('fontWeight', 'normal');
    } else {
      $("#closeSignUp").css('color', 'black');
    }
  }

  return (
    <form style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: 'auto', borderRadius: '10px', border: '1px black solid', padding: '10px 20px 20px 20px'}}>
      <div style={{backgroundColor: 'white', textAlign: 'left'}}>
        <CloseIcon id="closeSignUp" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} onClick={handleClick}/>
      </div>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontWeight: '20'}}>Sign Up</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='text' id='fullName' name='fullName' placeholder="Full Name" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='email' id='email' name='email' placeholder="Email" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='password' id='password' name='password' placeholder="Password" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onBlur={handleBlur} onFocus={ handleFocus } onChange={handleChange} type='password' id='confirmPassword' name='confirmPassword' placeholder="Confirm Password" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button name='continue' onFocus={ handleFocus } onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="continue" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: '#1E90FF', color: 'white'}}>Continue</button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <span style={{fontSize: '10px'}}>or</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button name='googleButton' onFocus={ handleFocus } onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="googleButton" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid', backgroundColor: 'white'}}>Continue with Google</button>
        </Grid>
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <span style={{ padding: '20px 0 40px 0', fontSize: '12px'}}>Already have an account? <Link href='/loginPage'>
            <a id="loginLink" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} href="" style={{ textDecoration: 'underline'}}>Log In</a>
          </Link></span>
          <br />
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUp;