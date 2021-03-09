import React,{ useState,useContext } from 'react';
import UserContext from '../../context/UserContext';

import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import Mobile from './Mobile';
import { Drawer, Button } from 'antd';
import {Link } from 'react-router-dom'
import './Navbar.css';

export default function Navbar() {

  const { userData, setUserData } = useContext(UserContext);

  const [current, setCurrent] = useState('');
  const [visible, setVisible] = useState(false);
  const handleNav = (e) => {
    setCurrent(e.key);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const logout = () => {
    setUserData({
      token: null,
      loggedIn:false
    });
    localStorage.setItem('auth-token', '');
    console.log("logging out");
  };
  return (
    <nav className="menuBar">
          <div className="logo">
            <Link to="/">logo</Link>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu 
              handleNav={handleNav}
              current={current}
              userLoggedIn={userData}
              />
            </div>
            <div className="rightMenu">
                <RightMenu
                handleNav={handleNav}
                current={current}
                userLoggedIn={userData}
            logout={logout}
                />
            </div>
            <Button className="barsMenu" type="primary" onClick={showDrawer}>
              <span className="barsBtn"></span>
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
            <Mobile
            handleNav={handleNav}
            current={current}
            userLoggedIn={userData}
            logout={logout}
            
          />
          </Drawer>
            </div>
        </nav>
  );
}

