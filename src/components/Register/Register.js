import React, { useState,useContext } from 'react';
import { Form, Input, Button,Card } from 'antd';
import {useHistory} from 'react-router-dom'
import Error from '../Error/Error'
import axios from 'axios'
import './Register.css';

function Register() {

  const history = useHistory();

  const [error, setError] = useState('');
  
  const formItemLayout = {
    labelCol: {
      span: 24
    }
    // wrapperCol: {
    //   span: 10
    // }
  };

  const onFinish = async (values) => {

    console.log('Success:', values);
    

      try {
        const registerRes=await axios.post(
          'http://localhost:5000/users/signup',
          values
        );
        
        history.push('/login');      
      } 
      catch (error) {
        setError(error.response.data.message);
      }

      
    
  };

  const clearError = () => setError(undefined);

  return (
    <Card style={{width:"30%",height:"30%",margin:"auto",marginTop:"100px"}} title="Register" className="reg-container">
      <h1>Register</h1>

      <Form
        name="registration-form"
        onFinish={onFinish}
        {...formItemLayout}
        className="reg-form"
      >
        {error && <Error message={error} clearError={clearError} />}
        <Form.Item
          label="E-mail"
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
          <Input />
        </Form.Item>

        

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="reg-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Register;