import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = props => (
  <div>
    <Navbar setSearch={props.setSearch} />
    <Sidebar
      userId={props.userId}
      host={props.host}
      sidebarToggle={props.sidebarToggle}
      setSidebarToggle={props.setSidebarToggle}
    />
    {props.children}
  </div>
);

export default Layout;