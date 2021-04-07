import React from 'react';
import ComingUp from './home/ComingUp';
import s from '../styles/Sidebar.module.css';

const Sidebar = () => {

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.coming_up}>Coming Up:</div>
        <ComingUp />
      </div>
    </div>
  )
};

export default Sidebar;