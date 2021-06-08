import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = props => (
  <div>
    <Navbar
      providers={props.providers}
      csrfToken={props.csrfToken}
      setSearch={props.setSearch}
      userId={props.userId}
      host={props.host}
      setMainToggle={props.setMainToggle}
      name={props.name}
    />
    <Sidebar
      providers={props.providers}
      csrfToken={props.csrfToken}
      userId={props.userId}
      host={props.host}
      sidebarToggle={props.sidebarToggle}
      setSidebarToggle={props.setSidebarToggle}
    />
    {props.children}
  </div>
);

export default Layout;