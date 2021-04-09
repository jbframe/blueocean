import React from 'react';
import ComingUp from './home/ComingUp';
import s from '../styles/Sidebar.module.css';

const Sidebar = ({ userId, host, sidebarToggle, setSidebarToggle }) => {

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.coming_up}>My Events</div>
        <ComingUp
          userId={userId}
          host={host}
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      </div>
    </div>
  )
};

export default Sidebar;