import React, {Component} from "react";
import moment from "moment";
import {PlusOutlined} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber, message,
  Radio,
  Select,
  Switch,
  TimePicker,
  Upload
} from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class FormRegister extends Component {

  state = {};

  onFinish = values => {
    message.success(`${values.userName} 恭喜你, 完成表单注册`);
    console.log('Success:', values);
    //如何清空表单?
  };

  onFinishFailed = errorInfo => {
    message.error("失败");
    console.log('Failed:', errorInfo);
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            userImg: imageUrl,
            loading: false,
          }));
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        // 这里的sm是20是因为跟上面的4相加得24
        //问为什么2个xs相加不就48了吗, 原因是你已经是24了肯定就独占1行了. 第二个24就会跳到第二行
        //第一个sm是4, 就占不满一行, 所以下面的sm要补20 够24
        sm: 12
      }
    };

    //勾选协议需要的偏移样式
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };

    return (
        <div style={{width: '100%'}}>
          <Card title="注册表单">
            <Form
                layout="horizontal"
                name="表单详情"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
              <FormItem
                  label="用户名"
                  name="userName"
                  required="true"
                  rules={[{required: true, message: 'Please input your username!'}]}
                  {...formItemLayout}
              >
                <Input placeholder="请输入用户名"/>
              </FormItem>
              <FormItem
                  label="密码"
                  name="userPwd"
                  rules={[{required: true, message: 'Please input your password!'}]}
                  {...formItemLayout}
              >
                <Input type="password" placeholder="请输入用密码"/>
              </FormItem>
              <FormItem
                  label="性别"
                  name="sex"
                  {...formItemLayout}
              >
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                  label="年龄"
                  name="userAge"
                  {...formItemLayout}
              >
                <InputNumber defaultValue="18"/>
              </FormItem>
              <FormItem
                  label="当前状态"
                  name="state"
                  {...formItemLayout}
              >
                <Select defaultValue="3">
                  <Option value="1">苏文韬</Option>
                  <Option value="2">谢丹</Option>
                  <Option value="3">Kimi</Option>
                  <Option value="4">Bobby</Option>
                  <Option value="5">Tony</Option>
                  <Option value="6">Amy</Option>
                </Select>
              </FormItem>
              <FormItem
                  label="爱好"
                  name="interest"
                  {...formItemLayout}
              >
                <Select
                    defaultValue={['3', "4"]}
                    mode="tags"
                >
                  <Option value="1">足球</Option>
                  <Option value="2">篮球</Option>
                  <Option value="3">游泳</Option>
                  <Option value="4">乒乓球</Option>
                  <Option value="5">羽毛球</Option>
                  <Option value="6">斯诺克</Option>
                  <Option value="7">攀岩</Option>
                  <Option value="8">H5</Option>
                  <Option value="9">JS</Option>
                </Select>
              </FormItem>
              <FormItem
                  label="是否已婚"
                  name="isMarry"
                  {...formItemLayout}
              >
                <Switch/>
              </FormItem>
              <FormItem
                  label="生日"
                  name="birthday"
                  {...formItemLayout}
              >
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    //  如果要初始化日期, 就需要yarn add moment --save 一下
                    defaultValue={moment('2020-03-22')}
                />
              </FormItem>
              <FormItem
                  label="联系地址"
                  name="address"
                  {...formItemLayout}
              >
                <TextArea
                    autoSize={{minRows: 2, maxRows: 8}}
                />
              </FormItem>
              <FormItem
                  label="早起时间"
                  name="time"
                  {...formItemLayout}
              >
                <TimePicker/>
              </FormItem>
              <FormItem
                  label="头像"
                  name="userImg"
                  {...formItemLayout}
              >
                <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                >
                  {this.state.userImg ? <img src={this.state.userImg}/> : <PlusOutlined/>}
                </Upload>
              </FormItem>
              <FormItem name="userIsRead" {...offsetLayout}>
                <Checkbox>
                  我已阅读过<a href="#">慕课协议</a>
                </Checkbox>
              </FormItem>
              <FormItem {...offsetLayout}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </FormItem>
            </Form>
          </Card>
        </div>
    );
  }
}
