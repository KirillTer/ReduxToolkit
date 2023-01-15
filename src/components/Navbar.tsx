import { Menu } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import MenuItem from "antd/lib/menu/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteNames } from './AppRouter'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: "/posts",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.POSTS),
      label: 'Posts'
    },
        {
      key: "/users",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.USERS),
      label: 'Users'
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode="horizontal"
          defaultSelectedKeys={location.pathname === RouteNames.HOME ? [RouteNames.POSTS] : [location.pathname]}
          items={menuItems}
        />
      </Header>
    </Layout>
  );
}
 
export default Navbar;