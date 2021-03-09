import React, { useContext, useState } from 'react';
import { Form, Input, Button,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jwt_decode from "jwt-decode";
import Error from '../Error/Error';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Login.css'

export default function Login(){

  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState('');


  const onFinish = async (values) => {

    try {
      const loginRes=await axios.post(
        'http://localhost:5000/users/signin',
        values
      );
      localStorage.setItem('auth-token', loginRes.data.token);
      const decoded=jwt_decode(loginRes.data.token).id
      setUserData({
        token: decoded,
        loggedIn:true
      });
      window.location = '/';
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const clearError = () => setError(undefined);
  

  return (
    <Card style={{width:"50%",margin:"100px auto auto auto",}} title="Login" className="login-container">
      

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        {error && <Error message={error} clearError={clearError} />}
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to="/">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">Register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}

