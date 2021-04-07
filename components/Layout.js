import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = props => (
  <div>
    <Navbar />
    <Sidebar userId={props.userId} />
    {props.children}
  </div>
);

export default Layout;