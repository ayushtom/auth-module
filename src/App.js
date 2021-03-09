import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/UserContext';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Navbar from './components/Navbar/index'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import Home from './pages/Home/Home'


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    loggedIn:false
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      
      const tokenRes = await axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        // const userRes = await axios.get('http://localhost:5000/users/', {
        //   headers: { 'x-auth-token': token }
        // });
        var decoded = jwt_decode(token).id;
        setUserData({
          token:decoded,
          loggedIn:true
        });
      }
    };
    checkLoggedIn();
  }, []);


  return (
    <>
    <Router>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;
