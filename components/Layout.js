import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = props => (
  <div>
    <Navbar />
    <Sidebar />
    {props.children}
  </div>
);

export default Layout;