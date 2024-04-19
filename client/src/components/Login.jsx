import './login.css'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';


const onFinish = async (values) => {
  console.log('Password:', values.password);
  try {
    const response = await axios.post('http://localhost:3000/login', values, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 55000
    });
    const data = response.data;
    console.log(data);
    localStorage.setItem('token', data.token);
    console.log('Login successful');
  } catch (error) {
    console.error('There was an error!', error);
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed-out');
    } else if (error.response) {
      console.log('Login failed:', error.response.data);
    } else {
      console.log('Login failed');
    }
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function App() {
  return (
    <div className="container">
      <div className="frame">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default App;
