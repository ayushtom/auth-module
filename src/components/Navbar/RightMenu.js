import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function RightMenu(props) {
  const user = props.userLoggedIn.token;
  return (
    
    <Menu 
    mode="horizontal"
    onClick={props.handleNav}
    selectedKeys={[props.current]}>
    {!user && (
        <Menu.Item key="mail">
          <Link to="/login">Sign In</Link>
        </Menu.Item>
        )}
    {!user && (
        <Menu.Item key="Register">
          <Link to="/register">Sign Up</Link>
        </Menu.Item>
        )}
      {user && (
          <Menu.Item key="logout">
            <Link onClick={props.logout} to="/">Logout</Link>
          </Menu.Item>
        )}
      </Menu>
    
  );
}

