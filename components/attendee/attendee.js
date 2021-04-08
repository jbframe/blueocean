import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
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

const Attendee = (props) => {
  const classes = useStyles();
  const [attempts, setAttempts] = useState('');
  const [assessmentQuestion, setAssessmentQuestion] = useState('What are the company values?');
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState([{ option: 'Integrity', idVal: 'unselected'}, { option: 'Loyalty', idVal: 'unselected'}, { option: 'Discipline', idVal: 'unselected'}, { option: 'Responsibility', idVal: 'unselected'}]);
  const [optionsFromDB, setOptionsFromDB] = useState([]);

  useEffect(() => {
    axios.get('/assessments/1')
      .then((res) => {
        console.log(res.data);
        setOptionsFromDB(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function handleMouseEnter(e) {
    if ( e.target.id === "option" ) {
      $(e.target).css('border', '1px #1E90FF solid');
      $(e.target).css('boxShadow', '2px 2px #1E90FF');
    } else {
      $(e.target).css('border', '1px black solid');
      $(e.target).css('boxShadow', '2px 2px black');
    }
  }

  function handleMouseLeave(e) {
    console.log(e.target.id);
    if ( e.target.id === "option" ) {
      $(e.target).css('border', '1px black solid');
      $(e.target).css('boxShadow', '0px 0px white');
    } else {
      $(e.target).css('border', '1px white solid');
      $(e.target).css('boxShadow', '0px 0px white');
    }
  }

  function handleClick(e) {
    if ( e.target.id === 'option' && e.target.name === '') {
      $(e.target).css('outline', 'none');
      $(e.target).css('fontWeight', 'bold');
      $(e.target).attr('name', 'selected');
    }
    else if ( e.target.id === 'option' && e.target.name === 'selected') {
      $(e.target).css('fontWeight', 'normal');
      $(e.target).attr('name', '');
    } else {
      if ( e.target.id === 'submit') {
        $(e.target).css('outline', 'none');
      }
    }
  }

  return (
    <div style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: 'white', width: '50%', margin: '20vh auto 0 auto', borderRadius: '10px', border: '1px black solid', padding: '10px 20px 20px 20px'}}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h1 style={{ fontWeight: '20'}}>{ assessmentQuestion }</h1>
        </Grid>
        { options.map((ele, idx) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <button id="option" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid', backgroundColor: 'white', color: 'black'}}>{ ele.option }</button>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <button id="submit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{padding:'10px 0 25px 0px', width: '80%', height: '30px', margin: 'auto', borderRadius: '10px', border: '1px black solid', backgroundColor: '#1E90FF', color: 'white'}}>Submit</button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Attendee;