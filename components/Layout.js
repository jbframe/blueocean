import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = props => (
  <div>
    <Navbar setSearch={props.setSearch} />
    <Sidebar userId={props.userId} />
    {props.children}
  </div>
);

export default Layout;