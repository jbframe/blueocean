import React, { useState, useEffect, useRef } from 'react';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import $ from 'jquery';
// import { jsx, css } from '@emotion/react';

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
function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if ( node ) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);
  return [ref, value];
}


const SignUp = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [hoverRef, isHovered] = useHover();
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
      $(e.target).css('border', '1px salmon solid');
      $(e.target).css('boxShadow', '2px 2px salmon');
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
      if ( !fullNameRegex.test(e.target.value) ) {
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
    if ( e.target.innerHTML === 'Continue') {
      // Execute some code
      console.log(e.target.innerHTML);
      console.log('Fullname: ' + fullName + " Email:" + email + " Password: " + password);
      console.log('Fullname: ' + fullNameRegex.test(fullName) + " Email:" + emailRegex.test(email) + " Password: " + passwordRegex.test(password));
      if ( fullNameRegex.test(fullName) && emailRegex.test(email) && passwordRegex.test(password) && passwordRegex.test(confirmPassword) && password === confirmPassword ) {
          console.log('Save user information');
          // Make an axios request to post the information
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
    } else {
      // Execute some code for google login
    }
  }
  return (
    <div style={{ maxWidth: '500px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1>Sign Up</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onChange={handleChange} type='text' id='fullName' name='fullName' placeholder="Full Name" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onChange={handleChange} type='text' id='email' name='email' placeholder="Email" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onChange={handleChange} type='password' id='password' name='password' placeholder="Password" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <input onChange={handleChange} type='password' id='confirmPassword' name='confirmPassword' placeholder="Confirm Password" style={{padding:'10px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid'}}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button name='continue' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id="continue" style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px white solid', backgroundColor: 'salmon', color: 'white'}}>Continue</button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <span>or</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button name='googleButton' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid', backgroundColor: 'white'}}>Continue with Google</button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <span style={{ padding: '20px 0 40px 0', fontSize: '12px'}}>Already have an account? <a ref={hoverRef} href="" style={{ textDecoration: 'underline'}}>{isHovered ? <span style={{ fontWeight: 'bold'}}>Log In</span> : <span>Log In</span>}</a></span>
          <br />
        </Grid>
      </Grid>
    </div>
  )
}

export default SignUp;