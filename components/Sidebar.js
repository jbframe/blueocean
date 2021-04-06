import React from 'react';
import ComingUp from './home/ComingUp';
import s from '../styles/Sidebar.module.css';

const Sidebar = () => {

  return (
    <div className={s.sidebar}>
      Coming up:
      <ComingUp />
    </div>
  )
};

export default Sidebar;